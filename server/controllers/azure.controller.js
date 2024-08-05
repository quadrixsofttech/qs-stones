const AzureService = require("../services/azure/azure.service");

const createEvent = async (req, res) => {
  const { email, eventData } = req.body;

  try {
    const accessToken = await AzureService.acquireToken(email);
    const userId = await AzureService.getUserId(accessToken, email);
    const event = await AzureService.createCalendarEvent(
      accessToken,
      userId,
      eventData
    );
    res.status(201).json(event);
  } catch (error) {
    console.error("Error in creatign Event", error);
    res.status(500).json({ error: "Something went wrong when creating event" });
  }
};

module.exports = { createEvent };
