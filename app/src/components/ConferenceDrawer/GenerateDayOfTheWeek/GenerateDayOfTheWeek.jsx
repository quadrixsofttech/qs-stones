import { Flex } from '@chakra-ui/react';
import DayOfTheWeek from '../../../constants/DayOfTheWeek';
import styles from './GenerateDayOfTheWeek.styles';
import React from 'react';

export default function GenerateDayOfTheWeek({
  switchIsChecked,
  everyDayChecked,
  setEveryDayChecked,
}) {
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(-1);

  const handleColorClick = (index) => {
    if (everyDayChecked) {
      setEveryDayChecked(false);
    } else {
      setSelectedColorIndex((prevIndex) => (prevIndex === index ? -1 : index));
    }
  };

  React.useEffect(() => {
    if (everyDayChecked) {
      setSelectedColorIndex(-1);
    }
  }, [everyDayChecked]);

  return (
    <Flex alignItems={'center'} justifyContent={'space-around'} mt={4}>
      {Object.values(DayOfTheWeek).map((day, index) => (
        <Flex
          {...styles.dayContainer}
          key={index}
          color={
            switchIsChecked || everyDayChecked
              ? selectedColorIndex === -1 || selectedColorIndex === index
                ? 'white'
                : 'black'
              : 'gray.200'
          }
          borderColor={switchIsChecked ? 'gray.200' : 'gray.100'}
          bgColor={
            everyDayChecked || selectedColorIndex === index
              ? 'purple.500'
              : 'transparent'
          }
          onClick={() => handleColorClick(index)}
        >
          {day}
        </Flex>
      ))}
    </Flex>
  );
}
