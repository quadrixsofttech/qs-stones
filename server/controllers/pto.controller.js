const PtoService = require('../services/pto/pto.service');
const { StatusCodes } = require('http-status-codes');

const createPaidTimeOff = async (req, res) => {
  try {
    const { type, status, userId, paidLeaveType, reviewerId, dates, comment } =
      req.body;

    const pto = await PtoService.createPTO({
      type,
      status,
      userId,
      paidLeaveType,
      reviewerId,
      dates,
      comment,
    });
    res.send(pto);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: err.message });
  }
};

const getPendingPTO = async (req, res) => {
  try {
    const { type } = req.params;
    const allPtos = PtoService.getPendingPTO(type);
    res.send(allPtos);
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const updatePaidTimeOff = async (req, res) => {
  try {
    const { id, status, comment } = req.body;
    const updatedPTO = await PtoService.updatePTO(id, { status, comment });

    if (!updatedPTO) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'PTO not found' });
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'PTO updated successfully', updatedPTO });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const updateOnEdit = async (req, res) => {
  try {
    const { id, type, dates } = req.body;
    if (!id || !type || !dates) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Missing required fields: id, type, or dates',
      });
    }

    const updatedPTO = await PtoService.updatePTO(id, type, dates);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'TO updated successfully',
      updatedPTO,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const approvePaidTimeOff = async (req, res) => {
  try {
    const { id, reviewerId } = req.body;
    const updatedPTO = await PtoService.approvePTO(id, reviewerId);

    if (!updatedPTO) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'PTO not found' });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'PTO approved successfully',
      updatedPTO,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const rejectPaidTimeOff = async (req, res) => {
  try {
    const { id, comment, reviewerId } = req.body;
    const updatedPTO = await PtoService.rejectPTO(id, comment, reviewerId);

    if (!updatedPTO) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'PTO not found' });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'PTO rejected successfully',
      updatedPTO,
    });
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

const getAwayUserCountForToday = async (req, res) => {
  try {
    const remoteUsersToday = await PtoService.getApprovedPTOForToday();
    res.send(remoteUsersToday);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
  }
};

const deleteRemoteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRequest = await PtoService.deleteRemoteRequest(id);
    res.send(deleteRequest);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ err: error.message });
  }
};

module.exports = {
  createPaidTimeOff,
  getUserHistory,
  getPaidTimeOff,
  updatePaidTimeOff,
  approvePaidTimeOff,
  rejectPaidTimeOff,
  getAwayUserCountForToday,
  deleteRemoteRequest,
  getPendingPTO,
  updateOnEdit,
};
