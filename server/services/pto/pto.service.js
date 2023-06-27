const PayedTimeOff = require('./models/PTO');
const { differenceInCalendarDays, addDays, format } = require('date-fns');

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
  reveiewerId,
  dates,
  comment,
}) => {
  try {
    const days = dates.reduce((acc, date) => {
      const start = new Date(date.startDate);
      const end = new Date(date.endDate);
      const totalDays = differenceInCalendarDays(end, start) + 1;
      const generatedDates = Array.from({ length: totalDays }, (_, index) =>
        format(addDays(start, index), 'yyyy-MM-dd')
      );
      return [...acc, ...generatedDates];
    }, []);
    const pto = new PayedTimeOff({
      type,
      status,
      userId,
      reveiewerId,
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

//MyHistoryService

const getPtoHistory = async (userId) => {
  try {
    const ptoHistory = await PayedTimeOff.find({ userId });
    return ptoHistory;
  } catch (err) {
    throw new Error('Error in getting history for user');
  }
};

module.exports = { getAllPTO, createPTO, updatePTO, deletePTO, getPtoHistory };
