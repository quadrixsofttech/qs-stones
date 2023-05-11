import { useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const useCalendar = () => {
  const [listOfRanges, setListOfRanges] = useState([]);
  const { onClose } = useDisclosure();

  const toast = useToast();

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

  return [
    listOfRanges,
    setListOfRanges,
    handleSubmit,
  ];
};
