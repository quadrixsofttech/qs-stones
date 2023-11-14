import { useState } from 'react';
import axios from 'axios';

export const useConferenceRoomReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
 

  const createReservation = async (reservationData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        '/api/v1/conference-rooms/reservations',
        reservationData
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const updateReservation = async (reservationId, reservationData) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/api/v1/conference-rooms/reservations/${reservationId}`,
        reservationData
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    createReservation,
    updateReservation,
    isLoading,
  };
};
