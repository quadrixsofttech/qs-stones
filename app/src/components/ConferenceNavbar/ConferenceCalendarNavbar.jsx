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
import NavbarButtons from './NavbarButtons';
import moment from 'moment';
import FloorTypes from './constants/FloorTypes';
import { useState } from 'react';
import styles from './ConferenceCalendarNavbar.styles';

export default function ConferenceNavbar() {
  const {
    currentDate,
    formattedDate,
    handleNextDay,
    handlePreviousDay,
    setCurrentDate,
  } = useDates(moment());
  const [active, setActive] = useState(false);

  return (
    <Flex alignItems={'center'}>
      <Flex alignItems={'center'}>
        <ChakraIcon
          as={ChevronLeftIcon}
          onClick={handlePreviousDay}
          boxSize={5}
        />
        <ChakraIcon as={ChevronRightIcon} onClick={handleNextDay} boxSize={5} />
        <Box {...styles.formatedDate}>{formattedDate}</Box>
        <DatePicker
          className="custom-calendar"
          render={(value, openCalendar) => {
            return (
              <ChakraIcon
                as={ChevronDownIcon}
                onClick={openCalendar}
                boxSize={5}
              />
            );
          }}
          onChange={setCurrentDate}
          value={currentDate}
        />
      </Flex>
      <Spacer />
      <Flex alignItems={'center'} justifyContent={'flex-end'}>
        <NavbarButtons
          setCurrentDate={setCurrentDate}
          active={active}
          setActive={setActive}
        />
        <Divider orientation="vertical" h={8} />
        <ChakraIcon as={BiGridVertical} {...styles.iconGridVertical} />
        <ChakraIcon as={BiGridHorizontal} {...styles.iconGridHorizontal} />
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
