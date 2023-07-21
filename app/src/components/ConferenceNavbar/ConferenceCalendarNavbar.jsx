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
import FloorTypes from './constants/FloorTypes';
import styles from './ConferenceCalendarNavbar.styles';

const ConferenceNavbar = ({
  timelineOrientation,
  setTimelineOrientation,
  timelineFilter,
  setTimelineFilter,
  currentDate,
  formattedDate,
  handleNextDay,
  handlePreviousDay,
  setCurrentDate,
}) => {
  return (
    <Flex {...styles.navbarContainer}>
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
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          timelineFilter={timelineFilter}
          setTimelineFilter={setTimelineFilter}
        />
        <Divider orientation="vertical" h={8} />
        <ChakraIcon
          as={BiGridVertical}
          {...styles.iconGridVertical}
          onClick={() => {
            setTimelineOrientation('vertical');
          }}
          borderRadius={'50%'}
          _hover={{ backgroundColor: 'gray.200' }}
          backgroundColor={
            timelineOrientation === 'vertical' ? 'purple.50' : 'white'
          }
          color={timelineOrientation === 'vertical' ? 'purple.700' : 'black'}
        />
        <ChakraIcon
          as={BiGridHorizontal}
          {...styles.iconGridHorizontal}
          onClick={() => {
            setTimelineOrientation('horizontal');
          }}
          borderRadius={'50%'}
          _hover={{ backgroundColor: 'gray.200' }}
          backgroundColor={
            timelineOrientation === 'horizontal' ? 'purple.50' : 'white'
          }
          color={timelineOrientation === 'horizontal' ? 'purple.700' : 'black'}
        />

        <Select size="sm" borderRadius={'5'}>
          {Object.values(FloorTypes).map((type) => (
            <option value={type} key={FloorTypes.id + '-' + type}>
              {type}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export default ConferenceNavbar;
