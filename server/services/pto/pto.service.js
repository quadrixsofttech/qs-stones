const PaidTimeOff = require('../../models/pto.model');
const moment = require('moment');
const User = require('../../models/user.model');
const { holidays } = require('../../utils/utils.js');

const weekendDays = [6, 0];

const getAllPTO = async () => {
  try {
    const pto = await PaidTimeOff.find().lean();
    return pto;
  } catch (err) {
    throw new Error(err);
  }
};

const getPTO = async (type) => {
  try {
    const paidTimeOff = await PaidTimeOff.find({
      type: type,
      status: 'approved',
    })
      .populate({ path: 'userId', select: '-password' })
      .populate({ path: 'reviewerId', select: '-password' });

    const formattedPaidTimeOff = paidTimeOff.map((paidtimeoff) => ({
      _id: paidtimeoff._id,
      dates: paidtimeoff.dates,
      days: paidtimeoff.days,
      createdAt: paidtimeoff.createdAt,
      updatedAt: paidtimeoff.updatedAt,
      type: paidtimeoff.type,
      status: paidtimeoff.status,
      userId: paidtimeoff.userId,
      reviewerId: paidtimeoff.reviewerId,
      comment: paidtimeoff.comment,
      user: {
        firstName: paidtimeoff.userId.firstName,
        lastName: paidtimeoff.userId.lastName,
      },
    }));
    return {
      pto: formattedPaidTimeOff,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const createPTO = async ({
  type,
  status,
  userId,
  paidLeaveType,
  dates,
  reviewerId,
  comment,
}) => {
  try {
    const days = dates.reduce((acc, [startDate, endDate]) => {
      const start = moment(startDate);
      const end = moment(endDate);
      const totalDays = end.diff(start, 'days') + 1;
      const generatedDates = Array.from({ length: totalDays }, (_, index) =>
        start.clone().add(index, 'days').format('YYYY-MM-DD')
      );

      const filteredDates = generatedDates.filter((date) => {
        const isHoliday = holidays.some((holiday) => holiday.date === date);
        const isWeekend = weekendDays.includes(moment(date).day());
        return !isHoliday && !isWeekend;
      });

      return [...acc, ...filteredDates];
    }, []);

    if (type === 'paid time off' && days.length > 5)
      return 'Number of days succeeds limit';

    if (
      type == 'remote' ||
      type === 'paid time off' ||
      type === 'unpaid time off' ||
      type === 'sick leave'
    ) {
      var pto = new PaidTimeOff({
        type,
        status,
        userId,
        paidLeaveType: paidLeaveType ? paidLeaveType : undefined,
        days,
        dates,
        reviewerId,
        comment,
      });

      await pto.save();
      return pto;
    } else if (type === 'vacation') {
      const user = await User.findById(userId);

      let maxDate = moment(days[0]);

      for (let date of days) {
        const currentDate = moment(date);
        if (currentDate.isAfter(maxDate)) {
          maxDate = currentDate;
        }
      }
      var totalNumberOfVacationDays;
      if (maxDate.month() >= 0 && maxDate.month() < 6) {
        let currentYear = user.vacation.find((v) => v.year === maxDate.year());
        let lastYear = user.vacation.find((v) => v.year === maxDate.year() - 1);
        totalNumberOfVacationDays =
          (currentYear?.vacationDays ?? 0) + (lastYear?.vacationDays ?? 0);
      } else {
        let currentYear = user.vacation.find((v) => v.year === maxDate.year());
        totalNumberOfVacationDays = currentYear?.vacationDays ?? 0;
      }

      if (totalNumberOfVacationDays >= days.length) {
        var pto = new PaidTimeOff({
          type,
          status,
          userId,
          days,
          dates,
          reviewerId,
          comment,
        });
        await pto.save();
        return pto;
      }
      else
      {
        throw new Error({ success: false, message: 'Not enough vacation days' });
      }
    }
    else
    {
      throw new Error({ success: false, message: 'Type not valid' });
    }
  } catch (err) {
    throw new Error('Something went wrong');
  }
};

const updatePTO = async (id, updates) => {
  try {
    const pto = await PaidTimeOff.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    return pto;
  } catch (err) {
    throw new Error({ success: false, message: 'Problem in updateing pto' });
  }
};

const approvePTO = async (id, reviewerId) => {
  try {
    const pto = await PaidTimeOff.findById(id);
    const user = await User.findById(pto.userId);
    const ptoType = pto.type;

    if (
      ptoType === 'remote' ||
      ptoType === 'paid time off' ||
      ptoType === 'unpaid time off' ||
      ptoType === 'sick leave'
    ) {
      pto.status = 'approved';
      pto.reviewerId = reviewerId;
      await pto.save();
    } else {
      let vacationDays = pto.days.length;

      let maxDate = moment(pto.days[0]);

      for (let date of pto.days) {
        const currentDate = moment(date);
        if (currentDate.isAfter(maxDate)) {
          maxDate = currentDate;
        }
      }

      let currentYear = user.vacation.find((v) => v.year === maxDate.year());
      let lastYear = user.vacation.find((v) => v.year === maxDate.year() - 1);

      var currentYearVacationDays = currentYear.vacationDays;
      var currentYearUsedDays = currentYear.usedDays;

      var lastYearVacationDays;
      var lastYearUsedDays;

      if (!lastYear) {
        lastYearVacationDays = 0;
        lastYearUsedDays = 20;
      } else {
        lastYearVacationDays = lastYear.vacationDays;
        lastYearUsedDays = lastYear.usedDays;
      }

      if (maxDate.month() >= 0 && maxDate.month() < 6) {
        if (lastYearVacationDays >= vacationDays) {
          lastYearVacationDays -= vacationDays;
          lastYearUsedDays =
            lastYear.initialVacationDays - lastYearVacationDays;
        } else {
          vacationDays -= lastYearVacationDays;
          lastYearVacationDays = 0;
          lastYearUsedDays = lastYear.initialVacationDays;
          currentYearVacationDays -= vacationDays;
          currentYearUsedDays =
            currentYear.initialVacationDays - currentYearVacationDays;
        }
      } else {
        if (currentYearVacationDays >= vacationDays) {
          currentYearVacationDays -= vacationDays;
          currentYearUsedDays =
            currentYear.initialVacationDays - currentYearVacationDays;
        } else {
          throw new Error('Nemas dovoljno slobodnih dana');
        }
      }

      if (lastYear) {
        lastYear.vacationDays = lastYearVacationDays;
        lastYear.usedDays = lastYearUsedDays;
      }
      currentYear.vacationDays = currentYearVacationDays;
      currentYear.usedDays = currentYearUsedDays;

      pto.status = 'approved';
      pto.reviewerId = reviewerId;

      await Promise.all([pto.save(), user.save()]);
    }
    return pto;
  } catch (err) {
    throw new Error({
      success: false,
      message: 'Problem with approving paid time off',
    });
  }
};

const rejectPTO = async (id, comment, reviewerId) => {
  try {
    const pto = await PaidTimeOff.findByIdAndUpdate(id, {
      status: 'rejected',
      reviewerId: reviewerId,
      comment: comment,
    });
    return pto;
  } catch (err) {
    throw new Error({
      success: false,
      message: 'Problem with rejecting paid time off',
    });
  }
};

const deletePTO = async (id) => {
  try {
    const pto = await PaidTimeOff.findByIdAndDelete(id);
    return pto;
  } catch (err) {
    throw new Error({ success: false, message: 'Problem in deleting pto' });
  }
};

const getUserHistory = async (userId) => {
  try {
    const ptoHistory = await PaidTimeOff.find({ userId })
    .populate({ path: 'reviewerId', select: '-password' });

    return ptoHistory;
  } catch (err) {
    throw err;
  }
};

const getApprovedPTOForToday = async () => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const remote = await PaidTimeOff.countDocuments({
      type: 'remote',
      status: 'approved',
      days: { $in: [today] },
    });

    const vacationPTO = await PaidTimeOff.countDocuments({
      type: 'vacation',
      status: 'approved',
      days: { $in: [today] },
    });

    return { numberOfRemoteUsers: remote, numberOfVacationPTOs: vacationPTO };
  } catch (err) {
    throw new Error(err);
  }
};

const getUserDates = async (userId) => {
  try {
    const ptoDates = await PaidTimeOff.find({ userId }, { dates: 1 }).lean();
    const allDates = ptoDates.reduce((acc, pto) => {
      acc.push(...pto.dates);
      return acc;
    }, []);
    return allDates;
  } catch (err) {
    return [];
  }
};

module.exports = {
  getAllPTO,
  getPTO,
  createPTO,
  updatePTO,
  deletePTO,
  getUserHistory,
  getApprovedPTOForToday,
  getUserDates,
  rejectPTO,
  approvePTO,
};
