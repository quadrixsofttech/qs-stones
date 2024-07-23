import { useMutation } from 'react-query';
import axios from 'axios';

export const useRemoteRequestDeletion = () => {
  const remoteDeletionCallback = async (id) => {
    const response = await axios.delete(
      `api/v1/paid-time-off/delete-remote-request/${id}`,
      { id }
    );
    return response.data;
  };

  const {
    mutate: deleteRemoteRequest,
    data,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(remoteDeletionCallback);

  return { deleteRemoteRequest, data, isError, isLoading, isSuccess };
};
