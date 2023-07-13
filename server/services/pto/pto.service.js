const PayedTimeOff = require('../../models/Pto');
const moment = require('moment');

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
    throw new Error(err);
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
    throw new Error(err);
  }
};

const deletePTO = async (id) => {
  try {
    const pto = await PayedTimeOff.findByIdAndDelete(id);
    return pto;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getAllPTO, createPTO, updatePTO, deletePTO };
