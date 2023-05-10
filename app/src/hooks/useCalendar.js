  // const handleCalendarChange = (nextSelectedRange) => {
  //   setSelectedRange(nextSelectedRange);

  //   if (nextSelectedRange.length === 1) {
  //     const selectedDate = new Date(nextSelectedRange[0]);
  //     setStartDate(selectedDate);
  //     setEndDate(selectedDate);
  //     return;
  //   }

  //   const start = new Date(nextSelectedRange[0]);
  //   const end = new Date(nextSelectedRange[1]);
  //   const datesArray = [];
  //   let currentDate = new Date(start);

  //   while (currentDate <= end) {
  //     datesArray.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   const tagLabel = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  //   const tagColor = 'gray';
  //   const newTag = {
  //     label: tagLabel,
  //     color: tagColor,
  //     startDate: start,
  //     endDate: end,
  //     dates: datesArray,
  //   };

  //   setTagArray((prevTagArray) => [...prevTagArray, newTag]);
  //   setStartDate(start);
  //   setEndDate(end);

  //   console.log(tagArray);
  // };

  // const handleCalendarChange = (nextSelectedRange) => {
  //   setSelectedRange(nextSelectedRange);

  //   const start = new Date(nextSelectedRange[0]);
  //   const end = new Date(nextSelectedRange[1]);
  //   const datesArray = [];
  //   let currentDate = new Date(start);

  //   while (currentDate <= end) {
  //     datesArray.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   const filteredDatesArray = datesArray.filter((date) =>
  //     nextSelectedRange.includes(date.toISOString())
  //   );

  //   const tagLabel = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  //   const tagColor = 'gray';
  //   const newTag = {
  //     label: tagLabel,
  //     color: tagColor,
  //     startDate: start,
  //     endDate: end,
  //     dates: filteredDatesArray,
  //   };

  //   setTagArray((prevTagArray) => [...prevTagArray, newTag]);
  //   console.log(tagArray);
  // };

import { useDisclosure, useToast } from '@chakra-ui/react';
import {  useState } from 'react';

export const useCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState([]);
  const [tagArray, setTagArray] = useState([]);
  const { onClose } = useDisclosure();

  const toast = useToast();


  const handleCalendarChange = (nextSelectedRange) => {
    setSelectedRange(nextSelectedRange);
  
    const start = new Date(nextSelectedRange[0]);
    const end = new Date(nextSelectedRange[nextSelectedRange.length - 1]);
  
    const datesArray = [];
    let currentDate = new Date(start);
  
    while (currentDate <= end) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    const filteredDatesArray = datesArray.filter((date) =>
      nextSelectedRange.some(
        (selectedDate) => new Date(selectedDate).getTime() === date.getTime()
      )
    );
  
    const tagLabel = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    const tagColor = 'gray';
    const newTag = {
      label: tagLabel,
      color: tagColor,
      startDate: start,
      endDate: end,
      dates: filteredDatesArray,
    };
  
    setTagArray((prevTagArray) => [...prevTagArray, newTag]);
    setStartDate(null);
    setEndDate(null);
    console.log(tagArray)
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
        'Success You have submitted a request to the Admin for scheduiling vacation and remote work',
      position: 'top',
      status: 'success',
      isClosable: false,
      colorScheme: 'green',
      variant: 'subtle',
    });
  };

  return {
    startDate,
    endDate,
    selectedRange,
    tagArray,
    handleCalendarChange,
    handleRemoveTag,
    handleSubmit,
    setTagArray,
    setStartDate,
    setEndDate
  };
};