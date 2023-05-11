import {
  Box,
  Divider,
  Flex,
  Progress,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Info } from '@material-ui/icons';
import styles from './CalendarModal.styles';
import { useCalendar } from '../../hooks/useCalendar';
import { Calendar } from 'react-multi-date-picker';
import { useState } from 'react';

export const CalendarModal = (props) => {
  const [remoteValues, setRemoteValues] = useState([]);
  const [listOfRanges, setListOfRanges] = useCalendar();
  const [listOfVacationRanges, setListOfVacationRanges] = useCalendar();


  const renderRangeTag = (range) => {
    if (range.length !== 2) {
      return;
    }
    const startDate = range[0];
    const endDate = range[1];
    return (
      <Tag
        size={'sm'}
        fontSize={'12px'}
        borderRadius="full"
        variant="subtle"
        colorScheme="gray"
      >
        <TagLabel>
          {startDate.format()} - {endDate.format()}
        </TagLabel>
        <TagCloseButton />
      </Tag>
    );
  };

  const handleOnChange = (listOfRanges) => {
    setListOfRanges(listOfRanges);
  };

  const renderListOfRanges = (listOfRanges) => {
    if (!Array.isArray(listOfRanges)) {
      return;
    }
    return listOfRanges.map(renderRangeTag);
  };

  return (
    <>
      <Flex {...styles.progress}>
        <Box>1/2</Box>
        <Progress hasStripe value={props.value} flex={1} colorScheme="purple" />
      </Flex>
      <Box position="relative">
        <Flex alignItems="center" mt={2} gap={2}>
          <Text {...styles.textRemote}>{props.name}</Text>
          <Tooltip
            label="*Double-click to select a date on the calendar. 
                  *Single-click to select a range of dates on the calendar."
            placement="right"
            hasArrow
          >
            <Info fontSize={'small'} style={{ color: '#A0AEC0' }} />
          </Tooltip>
        </Flex>
      </Box>
      <Select mt={2}>
        <option value="option1">Milos Stosic(ADMIN)</option>
        <option value="option2">Igor Stosic(ADMIN)</option>
      </Select>
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Calendar
          range
          rangeHover
          multiple
          numberOfMonths={2}
          value={remoteValues}
          onChange={handleOnChange}
        />
      </Flex>
        <>
          <Text {...styles.textRequestDates}>
            Requested dates for Vacation:
          </Text>
          {renderListOfRanges(listOfRanges)}
          {/* {renderListOfRanges(listOfVacationRanges)} */}
          <Flex>
            <Flex></Flex>
          </Flex>
          <Divider />
        </>
      <Divider />
      <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
      <Flex {...styles.flexTag}>
        {/* {console.log('dadad')} */}
        {/* {tagArray.map((tag, index) => {
          console.log('daddadaddadaddadaer554ada');
          return (
            <Tag
              key={index}
              size={'sm'}
              fontSize={'12px'}
              borderRadius="full"
              variant="subtle"
              colorScheme={tag.color}
            >
              <Tooltip label={tag.label} placement="bottom" hasArrow>
                <TagLabel>
                  {tag.startDate.toLocaleDateString()} -{' '}
                  {tag.endDate.toLocaleDateString()}
                </TagLabel>
              </Tooltip>
              <TagCloseButton onClick={() => handleRemoveTag(index)} />
            </Tag>
          );
        })} */}
      </Flex>
      <Divider />
    </>
  );
};
