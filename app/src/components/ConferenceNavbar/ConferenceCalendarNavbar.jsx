import {
  Box,
  Divider,
  Flex,
  Icon as ChakraIcon,
  Select,
  Spacer,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { BiGridVertical, BiGridHorizontal } from 'react-icons/bi';
import useDates from '../../hooks/useDates';
import DatePicker from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';
import NavbarButtons from './NavbarButtons';
import moment from 'moment';
import FloorTypes from './constants/FloorTypes';

export default function ConferenceNavbar() {
  // const [selectedDate, setSelectedDate] = useState(moment());
  const {
    currentDate,
    handleNextDay,
    handlePreviousDay,
    getFormattedDate,
    handleDateChange,
  } = useDates(moment());

  return (
    <Flex alignItems={'center'} gap={24}>
      <Flex alignItems={'center'} justifyContent={'flex-start'}>
        <ChakraIcon
          as={ChevronLeftIcon}
          boxSize={5}
          onClick={handlePreviousDay}
        />
        <ChakraIcon as={ChevronRightIcon} boxSize={5} onClick={handleNextDay} />
        <Box pl={4} pr={2}>
          {getFormattedDate()}
        </Box>
        <DatePicker
          className="custom-calendar"
          render={<Icon as={ChevronDownIcon} />}
          onChange={handleDateChange}
          value={currentDate}
        />
      </Flex>
      <Spacer />
      <Flex alignItems={'center'} justifyContent={'flex-end'}>
        <NavbarButtons />
        <Divider orientation="vertical" h={8} />
        <ChakraIcon as={BiGridVertical} fontSize={30} ml={5} />
        <ChakraIcon as={BiGridHorizontal} fontSize={30} ml={3} mr={3} />
        <Select size="sm">
          {Object.values(FloorTypes).map((type) => (
            <option value={type} key={FloorTypes.id + '-' + type}>
              {type}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
}
