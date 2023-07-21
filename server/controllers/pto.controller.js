const PtoService = require('../services/pto/pto.service');
const { StatusCodes } = require('http-status-codes');

const createPaidTimeOff = async (req, res) => {
  try {
    const { type, status, userId, reviwerId, dates, comment } = req.body;

    const pto = await PtoService.createPTO({
      type,
      status,
      userId,
      reviwerId,
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

const getPaidTimeOff = async (req, res) => {
  try {
    const { type } = req.params;
    const pto = await PtoService.getPTO(type);
    return res.send(pto);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createPaidTimeOff,
  getPaidTimeOff,
};
