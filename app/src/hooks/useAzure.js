import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useAzure = () => {
  const createCalendarEventCallback = async ({ email, eventData }) => {
    const { data } = await axios.post("/api/v1/azure/create-event", {
      email,
      eventData,
    });
    return data;
  };

  const createCalendarEvent = useMutation(createCalendarEventCallback, {
    onError: (error) => {
      return error.response?.data || "An unknown error occurred";
    },
  });

  return {
    createCalendarEvent,
  };
};
