const msal = require("@azure/msal-node");
const axios = require("axios");

const cca = new msal.ConfidentialClientApplication({
  auth: {
    clientId: process.env.CLIENT_ID,
    authority:
      "https://login.microsoftonline.com/3c5efb0d-e7ba-4a1e-b15f-cba7f3b455ab",
    clientSecret: process.env.CLIENT_SECRET,
  },
});

const acquireToken = async () => {
  const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
  };

  try {
    const authResult = await cca.acquireTokenByClientCredential(tokenRequest);
    return authResult.accessToken;
  } catch (error) {
    console.error("Error acquiring token", error);
    throw error;
  }
};

const getUserId = async (accessToken, email) => {
  const url = `https://graph.microsoft.com/v1.0/users/${email}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.id;
  } catch (error) {
    console.error("Error getting user ID", error);
    throw error;
  }
};

const createCalendarEvent = async (accessToken, userId, eventData) => {
  const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${userId}/calendar/events`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-type": "application/json",
  };

  const events = eventData.range.map((dates) => {
    const startDate = new Date(parseInt(dates[0]));
    const endDate = new Date(parseInt(dates[1]) + 24 * 60 * 60 * 1000);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return {
      subject: eventData.type,
      start: {
        dateTime: startDate.toDateString(),
        timeZone: "Europe/Belgrade",
      },
      end: {
        dateTime: endDate.toDateString(),
        timeZone: "Europe/Belgrade",
      },
      showAs: "free",
      originalStartTimeZone: "Europe/Belgrade",
      originalEndTimeZone: "Europe/Belgrade",
    };
  });

  try {
    events.forEach(async (event) => {
      await axios.post(graphEndpoint, event, { headers });
      console.log(`Event created successfully: ${event.subject}`);
    });
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

module.exports = { acquireToken, createCalendarEvent, getUserId };
