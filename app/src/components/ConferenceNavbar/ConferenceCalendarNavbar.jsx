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
import DatePicker from 'react-multi-date-picker';
import NavbarButtons from './NavbarButtons';
import FloorTypes from './constants/FloorTypes';
import styles from './ConferenceCalendarNavbar.styles';
import useDates from '../../hooks/useDates';
import { useEffect } from 'react';
import moment from 'moment';

const ConferenceNavbar = ({
  timelineOrientation,
  setTimelineOrientation,
  timelineFilter,
  setTimelineFilter,
  setDate,
  floor,
  setFloor,
}) => {
  const {
    currentDate,
    formattedDate,
    handleNextDay,
    handlePreviousDay,
    setCurrentDate,
  } = useDates(new Date());

  useEffect(() => {
    setDate(moment(currentDate).format('YYYY-MM-DD'));
  }, [currentDate, setDate]);

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
          onChange={(selectedDate) => {
            let newDate = new Date(selectedDate);
            setCurrentDate(newDate);
          }}
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

        <Select
          size="sm"
          borderRadius={'5'}
          onChange={(e) => setFloor(e.target.value)}
          value={floor}
        >
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
