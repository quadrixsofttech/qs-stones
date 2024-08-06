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
  const mutation = useMutation(editPTO);

  return {
    editPTO: mutation.mutateAsync,
  };
};
