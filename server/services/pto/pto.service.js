const PayedTimeOff = require('./models/PTO');
const fs = require('fs');
const moment = require('moment');

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
    const holidaysData = fs.readFileSync('./holidays.json');
    const { holidays, weekendDays } = JSON.parse(holidaysData);

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

const updatePTO = async (id) => {
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
