import {
  Box,
  Divider,
  Flex,
  Icon,
  Select,
  Spacer,
  useStyleConfig,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { BiGridVertical, BiGridHorizontal } from 'react-icons/bi';
import useDates from '../../hooks/useDates';
import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
// import Icon from 'react-multi-date-picker/components/icon';

export default function ConferenceNavbar() {
  const { handleNextDay, handlePreviousDay, getFormattedDate } = useDates();
  const [clickedButtons, setClickedButtons] = useState([]);

  const handleClickButton = (buttonIndex) => {
    const updatedClickedButtons = [...clickedButtons];
    updatedClickedButtons[buttonIndex] = !clickedButtons[buttonIndex];
    setClickedButtons(updatedClickedButtons);
  };

  const buttonStyles = useStyleConfig('Button', {
    variant: 'clickedButton',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleArrowClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  return (
    <Flex alignItems={'center'} gap={24}>
      <Flex alignItems={'center'} justifyContent={'flex-start'}>
        <Icon as={ChevronLeftIcon} boxSize={5} onClick={handlePreviousDay} />
        <Icon as={ChevronRightIcon} boxSize={5} onClick={handleNextDay} />
        <Box pl={4} pr={2}>
          {getFormattedDate()}
        </Box>
        <Icon as={ChevronDownIcon} boxSize={5} onClick={handleArrowClick} />
        {showDatePicker && <DatePicker />}
      </Flex>
      <Spacer />
      <Flex alignItems={'center'} justifyContent={'flex-end'}>
        <Box
          pt={2}
          pl={2}
          pr={2}
          fontSize={'sm'}
          fontWeight={'500'}
          sx={buttonStyles}
          onClick={() => handleClickButton(0)}
          variant={clickedButtons[0] ? 'clickedButton' : 'normalButton'}
        >
          TODAY
        </Box>
        <Divider orientation="vertical" h={8} />
        <Box
          pt={2}
          pl={2}
          fontSize={'sm'}
          fontWeight={'500'}
          whiteSpace={'nowrap'}
          onClick={() => handleClickButton(0)}
          variant={clickedButtons[0] ? 'clickedButton' : 'normalButton'}
        >
          TIMELANE DAY
        </Box>
        <Box
          pt={2}
          pl={2}
          pr={6}
          fontSize={'sm'}
          fontWeight={'500'}
          whiteSpace={'nowrap'}
          onClick={() => handleClickButton(0)}
          variant={clickedButtons[0] ? 'clickedButton' : 'normalButton'}
        >
          TIMELANE WEEK
        </Box>
        <Divider orientation="vertical" h={8} />
        <Icon as={BiGridVertical} fontSize={30} ml={5} />
        <Icon as={BiGridHorizontal} fontSize={30} ml={3} mr={3} />
        <Select size="sm">
          <option>Upper floor</option>
          <option>Lower floor</option>
        </Select>
      </Flex>
    </Flex>
  );
}
