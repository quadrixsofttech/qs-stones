import { useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import moment from 'moment';

export const useCalendar = () => {
  const [tagArray, setTagArray] = useState([]);
  const { onClose } = useDisclosure();

  const toast = useToast();

  const handleTag = (start, end) => {
    const tagLabel = `${moment(start).format('YYYY-MM-DD')} - ${moment(
      end
    ).format('YYYY-MM-DD')}`;
    const tagColor = 'gray';
    const newTag = {
      label: tagLabel,
      color: tagColor,
      startDate: start,
      endDate: end,
    };
    setTagArray((prevTagArray) => [...prevTagArray, newTag]);
  };
  const handleRemoveTag = (tagIndex) => {
    const updatedTagArray = [...tagArray];
    updatedTagArray.splice(tagIndex, 1);
    setTagArray(updatedTagArray);
  };

  const handleSubmit = () => {
    onClose();
    return toast({
      title: 'Success',
      description:
        'Success You have submitted a request to the Admin for scheduling vacation and remote work',
      position: 'top',
      status: 'success',
      isClosable: false,
      colorScheme: 'green',
      variant: 'subtle',
    });
  };

  return {
    tagArray,
    handleRemoveTag,
    handleSubmit,
    setTagArray,
    handleTag,
  };
};
