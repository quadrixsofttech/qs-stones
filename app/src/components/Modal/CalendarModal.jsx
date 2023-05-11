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
import { useState, useContext } from 'react';
import moment from 'moment';
import CalendarContext from './../../context/CalendarContext';

export const CalendarModal = (props) => {
  const [remoteValues, setRemoteValues] = useState([]);
  const { handleRemoveTag } = useCalendar();
  const [tagArray, setTagArray] = useState([]);
  const { startDate, endDate, handleSetDates } = useContext(CalendarContext);

  const handleOnChange = (value) => {
    console.log(`startdate enddate`,startDate,endDate);
    if (Array.isArray(value)) {
      const startDate = value[value.length - 1]?.start;
      const endDate = value[value.length - 1]?.end;
      if (startDate && endDate) {
        const range = Array.from(
          { length: endDate.diff(startDate, 'days').toObject().days + 1 },
          (_, i) => startDate.clone().add(i, 'days')
        );
        setRemoteValues(range);
        handleSetDates(startDate, endDate);
      }
      console.log(startDate, endDate);
    } else {
      setRemoteValues([]);
    }
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
      {props.isClicked ?? (
        <>
          <Text {...styles.textRequestDates}>
            Requested dates for Vacation:
          </Text>

          <Flex>
          {startDate && endDate ? (
              <Flex>
                <Tag
                  size={"sm"}
                  fontSize={"12px"}
                  borderRadius="full"
                  variant="subtle"
                  colorScheme="green"
                >
                  <TagLabel>
                    {startDate.format("MMM D, YYYY")} -{" "}
                    {endDate.format("MMM D, YYYY")}
                  </TagLabel>
                  <TagCloseButton onClick={() => handleSetDates(null, null)} />
                </Tag>
              </Flex>
            ) : null}
          </Flex>
          <Divider />
        </>
      )}
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
