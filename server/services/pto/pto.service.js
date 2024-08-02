const PaidTimeOff = require('../../models/pto.model');
const moment = require('moment');
const User = require('../../models/user.model.js');
const { holidays } = require('../../utils/utils.js');
const CustomError = require('../../utils/CustomError.js');
const { sendEmail } = require('../../utils/mailer.js');

const weekendDays = [6, 0];

const getPendingPTO = async () => {
  try {
    const query =
      type === 'time off'
        ? {
            type: { $ne: 'remote' },
            status: 'pending',
          }
        : {
            type: type,
            status: 'pending',
          };

    const paidTimeOff = await PaidTimeOff.find(query)
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

const getPTO = async (type) => {
  try {
    const query =
      type === 'time off'
        ? {
            type: { $ne: 'remote' },
            status: 'approved',
          }
        : {
            type: type,
            status: 'approved',
          };

    const paidTimeOff = await PaidTimeOff.find(query)
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
  const user = await User.findById(userId);
  const admins = await User.find({ role: 'admin' }).select('email');
  const adminEmails = admins.map((admin) => admin.email);

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

    const existingPTO = await PaidTimeOff.find({
      userId,
      days: { $in: days },
    });

    if (existingPTO.length > 0) {
      throw new CustomError(
        'Some of the selected dates are already scheduled for remote work or PTO',
        422
      );
    }

    if (type === 'paid time off' && days.length > 5)
      throw new CustomError('Number of days exceeds limit', 422);

    if (
      type === 'remote' ||
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
      //Change recepients email to adminEmails when testing is over
      if (type != 'remote')
        await sendEmail(
          'katarina.kujundzic@quadrixsoft.com',
          `Request for ${type}`,
          `${user.firstName} ${user.lastName} has sent you a request for ${type}  http://stones.examia.io/admin`
        );
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
        //Change recepients email to adminEmails when testing is over
        await sendEmail(
          'katarina.kujundzic@quadrixsoft.com',
          `Request for ${type}`,
          `${user.firstName} ${user.lastName} has sent you a request for ${type}   http://stones.examia.io/admin`
        );
        return pto;
      } else {
        throw new Error({
          success: false,
          message: 'Not enough vacation days',
        });
      }
    } else {
      throw new Error({ success: false, message: 'Type not valid' });
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    } else {
      throw new CustomError('Something went wrong', 500);
    }
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
    if (!pto) {
      throw new Error('PTO request not found');
    }
    const user = await User.findById(pto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const ptoType = pto.type;

    if (
      ptoType === 'paid time off' ||
      ptoType === 'unpaid time off' ||
      ptoType === 'sick leave'
    ) {
      pto.status = 'approved';
      pto.reviewerId = reviewerId;
      await pto.save();
    } else if (ptoType === 'vacation') {
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
          throw new Error('You do not have enough vacation days');
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
    await sendEmail(
      user.email,
      `Approved request for ${ptoType}`,
      `Your request for ${ptoType} has been approved`
    );
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

    const user = await User.findById(pto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    await sendEmail(
      user.email,
      `Rejected request for ${pto.type}`,
      `Your request for ${pto.type} has been rejected`
    );
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

const deleteRemoteRequest = async (id) => {
  try {
    const remoteRequest = await PaidTimeOff.findByIdAndDelete(id, {
      type: 'remote',
    });
    return remoteRequest;
  } catch (error) {
    throw new Error({
      success: false,
      message: 'There was a problem in deleting remote request',
    });
  }
};

const getUserHistory = async (userId) => {
  try {
    const ptoHistory = await PaidTimeOff.find({ userId }).populate({
      path: 'reviewerId',
      select: '-password',
    });

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
      days: { $in: [today] },
    });

    const vacationPTO = await PaidTimeOff.countDocuments({
      type: {
        $in: ['vacation', 'paid time off', 'unpaid time off', 'sick leave'],
      },
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
  getPendingPTO,
  getPTO,
  createPTO,
  updatePTO,
  deletePTO,
  getUserHistory,
  getApprovedPTOForToday,
  getUserDates,
  rejectPTO,
  approvePTO,
  deleteRemoteRequest,
};
