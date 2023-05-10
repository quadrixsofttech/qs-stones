// import {
//   Box,
//   Divider,
//   Flex,
//   Progress,
//   Select,
//   Tag,
//   TagCloseButton,
//   TagLabel,
//   Text,
//   Tooltip,
// } from '@chakra-ui/react';
// import { Info } from '@material-ui/icons';
// import styles from './CalendarModal.styles';
// import { useCalendar } from '../../hooks/useCalendar';
// import { CustomCalendar } from '../CustomCalendar/CustomCalendar';

// export const CalendarModal = (props) => {
//   const { handleCalendarChange, handleRemoveTag, tagArray, selectedRange } =
//     useCalendar();
//   return (
//     <>
//       <Flex {...styles.progress}>
//         <Box>1/2</Box>
//         <Progress hasStripe value={props.value} flex={1} colorScheme="purple" />
//       </Flex>
//       <Box position="relative" zIndex={999999}>
//         <Flex alignItems="center" mt={2} gap={2}>
//           <Text {...styles.textRemote}>{props.name}</Text>
//           <Tooltip
//             label="*Double-click to select a date on the calendar.
//                   *Single-click to select a range of dates on the calendar."
//             placement="right"
//             hasArrow
//           >
//             <Info fontSize={'small'} style={{ color: '#A0AEC0' }} />
//           </Tooltip>
//         </Flex>
//       </Box>
//       <Select mt={2}>
//         <option value="option1">Milos Stosic(ADMIN)</option>
//         <option value="option2">Igor Stosic(ADMIN)</option>
//       </Select>
//       <CustomCalendar />
//       {props.isClicked ?? (
//         <>
//           <Text {...styles.textRequestDates}>
//             Requested dates for Vacation:
//           </Text>
//           <Flex {...styles.flexTag}>
//             {tagArray?.map((tag, index) => (
//               <Tag
//                 key={index}
//                 size={'sm'}
//                 fontSize={'12px'}
//                 borderRadius="full"
//                 variant="subtle"
//                 colorScheme={tag.color}
//               >
//                 <Tooltip label={tag.label} placement="bottom" hasArrow>
//                   <TagLabel>{tag.label}</TagLabel>
//                 </Tooltip>
//                 <TagCloseButton onClick={() => handleRemoveTag(index)} />
//               </Tag>
//             ))}
//           </Flex>
//           <Divider />
//         </>
//       )}
//       <Divider />
//       <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
//       <Flex {...styles.flexTag}>
//         {tagArray?.map((tag, index) => (
//           <Tag
//             key={index}
//             size={'sm'}
//             fontSize={'12px'}
//             borderRadius="full"
//             variant="subtle"
//             colorScheme={tag.color}
//           >
//             <Tooltip label={tag.label} placement="bottom" hasArrow>
//               <TagLabel>{tag.label}</TagLabel>
//             </Tooltip>
//             <TagCloseButton onClick={() => handleRemoveTag(index)} />
//           </Tag>
//         ))}
//       </Flex>
//       <Divider />
//     </>
//   );
// };

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
import { CustomCalendar } from '../CustomCalendar/CustomCalendar';

export const CalendarModal = (props) => {
  const { handleRemoveTag, tagArray,handleCalendarChange } = useCalendar();
  return (
    <>
      <Flex {...styles.progress}>
        <Box>1/2</Box>
        <Progress hasStripe value={props.value} flex={1} colorScheme="purple" />
      </Flex>
      <Box position="relative" zIndex={999999}>
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
      <CustomCalendar />
      {props.isClicked ?? (
        <>
          <Text {...styles.textRequestDates}>
            Requested dates for Vacation:
          </Text>
          {console.log('array',tagArray)}
          {tagArray && tagArray.length > 0 ? (
            <Flex {...styles.flexTag}>
              {tagArray.map((tag, index) => (
                <Tag
                  key={index}
                  size={'sm'}
                  fontSize={'12px'}
                  borderRadius="full"
                  variant="subtle"
                  colorScheme={tag.color}
                >
                  <Tooltip label={tag.label} placement="bottom" hasArrow>
                    <TagLabel>{tag.label}</TagLabel>
                  </Tooltip>
                  <TagCloseButton onClick={() => handleRemoveTag(index)} />
                </Tag>
              ))}
            </Flex>
          ) : null}
          <Divider />
        </>
      )}
      <Divider />
      <Text {...styles.textRequestDates}>Requested dates for Remote:</Text>
      <Flex {...styles.flexTag}>
        {console.log('dadad')}
        {tagArray.map((tag, index) => {
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
        })}
      </Flex>
      <Divider />
    </>
  );
};
