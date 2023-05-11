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
import moment from 'moment';

export const CalendarModal = (props) => {
  const [remoteValues, setRemoteValues] = useState([]);
  const { handleRemoveTag} = useCalendar();
  const [tagArray, setTagArray] = useState([]);

  const handleOnChange = (value) => {
    setRemoteValues(value);

    const startDate = moment(value[0]).format('YYYY-MM-DD');
    const endDate = moment(value[value.length - 1]).format('YYYY-MM-DD');
    const tagLabel = `${startDate} - ${endDate}`;
    console.log(tagLabel);
    const tagColor = 'gray';
    const newTag = {
      label: tagLabel,
      color: tagColor,
      startDate: value[0],
      endDate: value[value.length - 1],
    };

    setTagArray((prevTagArray) => [...prevTagArray, newTag]);
    console.log(tagLabel);
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
            {remoteValues.map((item) => (
              <Tag
                key={item}
                size={'sm'}
                fontSize={'12px'}
                borderRadius="full"
                variant="subtle"
                colorScheme="gray"
              >
                <Tooltip label={item.label} placement="bottom" hasArrow>
                  <TagLabel>{moment(item.label).format('YYYY-MM-DD')}</TagLabel>
                </Tooltip>
                <TagCloseButton
                  onClick={() => {
                    const index = tagArray.findIndex(
                      (tag) => tag.label === item.label
                    );
                    handleRemoveTag(index);
                  }}
                />
              </Tag>
            ))}
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
