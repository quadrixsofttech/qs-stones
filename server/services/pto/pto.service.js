const PayedTimeOff = require('../../models/pto.model');
const moment = require('moment');
const User = require('../../models/user.model');


const holidays = [
  '2023-01-01',
  '2023-01-02',
  '2023-01-06',
  '2023-02-15',
  '2023-04-07',
  '2023-04-14',
  '2023-05-01',
  '2023-05-02',
  '2023-05-09',
  '2023-05-25',
  '2023-06-15',
  '2023-06-24',
  '2023-11-11',
  '2023-12-25',
  '2023-12-26',
];
const weekendDays = [6, 0];

const getAllPTO = async () => {
  try {
    const pto = await PayedTimeOff.find().lean();
    return pto;
  } catch (err) {
    throw new Error(err);
  }
};

const getPTO = async (type) => {
  try {
    const pto = await PayedTimeOff.aggregate([
      {
        $match: {
          type: type,
          status: 'approved',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$userId'] },
              },
            },
            {
              $project: {
                _id: 0,
                firstName: 1,
                lastName: 1,
                src: 1,
              },
            },
          ],
          as: 'userArray',
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$userArray', 0] },
        },
      },
      {
        $project: {
          userArray: 0,
        },
      },
    ]);

    return {
      pto: pto,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const createPTO = async ({
  type,
  status,
  userId,
  reviewerId,
  dates,
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
        const isHoliday = holidays.includes(date);
        const isWeekend = weekendDays.includes(moment(date).day());
        return !isHoliday && !isWeekend;
      });

      return [...acc, ...filteredDates];
    }, []);
    const pto = new PayedTimeOff({
      type,
      status,
      userId,
      reviewerId,
      days,
      dates,
      comment,
    });
    await pto.save();
    return pto;
  } catch (err) {
    throw new Error({ success: false, message: 'Problem in creating pto' });
  }
};

const updatePTO = async (id, updates) => {
  try {
    const pto = await PayedTimeOff.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    return pto;
  } catch (err) {
    throw new Error({ success: false, message: 'Problem in updateing pto' });
  }
};

const deletePTO = async (id) => {
  try {
    const pto = await PayedTimeOff.findByIdAndDelete(id);
    return pto;
  } catch (err) {
    throw new Error({ success: false, message: 'Problem in deleting pto' });
  }
};

//MyHistoryService

const getUserHistory = async (userId) => {
  try {
    const ptoHistory = await PayedTimeOff.find({ userId }).lean();

    const reviewerIds = ptoHistory.map((pto) => pto.reviewerId);

    if (reviewerIds === 0) {
      return [];
    }

    const reviewers = await User.find(
      { _id: { $in: reviewerIds } },
      'firstName lastName'
    ).lean();

    const reviewerMap = reviewers.reduce((map, reviewer) => {
      map[reviewer._id] = reviewer;
      return map;
    }, {});

    const ptoHistoryWithReviewers = ptoHistory.map((pto) => {
      const reviewer = reviewerMap[pto.reviewerId];
      return {
        ...pto,
        reviewer: {
          firstName: reviewer.firstName,
          lastName: reviewer.lastName,
        },
      };
    });

    return ptoHistoryWithReviewers;
  } catch (err) {
    throw err;
  }
};

async function getUsersOnVacation() {
  const vacationUsers = await Pto.countDocuments({ type: 'vacation' });
  return vacationUsers;
}

async function calculateVacationPercentage() {
  const currentDate = moment();
  const lastYearDate = moment().subtract(1, 'year');

  const currentYearVacationUsers = await PayedTimeOff.aggregate([
    {
      $match: {
        type: 'vacation',
        createdAt: { $gte: currentDate.startOf('year').toDate() },
      },
    },
    {
      $group: {
        _id: '$userId',
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
      },
    },
  ]);

  const lastYearVacationUsers = await PayedTimeOff.aggregate([
    {
      $match: {
        type: 'vacation',
        createdAt: {
          $gte: lastYearDate.startOf('year').toDate(),
          $lte: lastYearDate.endOf('year').toDate(),
        },
      },
    },
    {
      $group: {
        _id: '$userId',
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
      },
    },
  ]);

  const currentYearVacationCount =
    currentYearVacationUsers.length > 0 ? currentYearVacationUsers[0].total : 0;
  const lastYearVacationCount =
    lastYearVacationUsers.length > 0 ? lastYearVacationUsers[0].total : 0;

  const percentage =
    lastYearVacationCount === 0
      ? 0
      : ((currentYearVacationCount - lastYearVacationCount) /
          lastYearVacationCount) *
        100;

  return percentage.toFixed(2);
}

const getUserDates = async (userId) => {
  try {
    const ptoDates = await PayedTimeOff.find({ userId }, { dates: 1 }).lean();
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
  calculateVacationPercentage,
  getUsersOnVacation,
  getUserDates,
};
