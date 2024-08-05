import { useMutation } from 'react-query';
import axios from 'axios';

const editPTO = async ({ id, type, dates }) => {
  const response = await axios.patch(`/api/v1/paid-time-off/edit`, {
    id,
    type,
    dates,
  });
  return response.data;
};

export const useEditPTO = () => {
  const mutation = useMutation({
    mutationFn: editPTO,
    onSuccess: (data) => {
      console.log('Request updated successfully', data);
    },
    onError: (error) => {
      console.error('Error in updating PTO', error);
    },
  });

  return {
    editPTO: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
