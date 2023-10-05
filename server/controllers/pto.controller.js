const PtoService = require('../services/pto/pto.service');
const { StatusCodes } = require('http-status-codes');

const createPaidTimeOff = async (req, res) => {
  try {
    const { type, status, userId, reviewerId, dates, comment } = req.body;

    const pto = await PtoService.createPTO({
      type,
      status,
      userId,
      reviewerId,
      dates,
      comment,
    });

    res.send(pto);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const updatePaidTimeOff = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedPTO = await PtoService.updatePTO(id, { status });

    if (!updatedPTO) {
      return res.status(404).json({ success: false, message: 'PTO not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'PTO updated successfully', updatedPTO });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const getUserHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const ptoHistory = await PtoService.getUserHistory(userId);
    res.send(ptoHistory);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const getPaidTimeOff = async (req, res) => {
  try {
    const { type } = req.params;
    const pto = await PtoService.getPTO(type);
    return res.send(pto);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

module.exports = {
  createPaidTimeOff,
  getUserHistory,
  getPaidTimeOff,
  updatePaidTimeOff,
};
