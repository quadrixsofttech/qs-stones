import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Flex,
  Icon,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { useState } from 'react';
import RequestStatus from './RequestStatus/RequestStatus';
import { MoreInformationPanel } from './MoreInformationPanel';
import statusTypes from './status';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const RequestPTO = ({
  status = statusTypes.pending,
  type,
  time,
  user,
  requestedDates,
  response,
  numberOfDays,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Box {...styles.box}>
      <Box as="span">
        <Text {...styles.grayText}>{time}</Text>
        {status === 'pending' ? (
          <>
            <Text {...styles.mainText}>You sent a request for {type}</Text>
          </>
        ) : (
          <>
            <Text {...styles.mainText}>
              You sent request for {type} to
              <Text {...styles.adminText} as="span">
                {' '}
                {user?.firstName} {user?.lastName} (ADMIN)
              </Text>
            </Text>
          </>
        )}
        <Text fontWeight={'bold'}>{numberOfDays} days</Text>
        <Box pt={2}>
          <RequestStatus status={status} />
        </Box>
        <Flex alignItems={'center'}>
          <Spacer />
          <Accordion defaultIndex={[1]} allowToggle {...styles.accordion}>
            <AccordionItem pt={2}>
              <h2>
                <AccordionButton onClick={toggleAccordion}>
                  <Box color={'gray.500'}>
                    {isAccordionOpen ? 'See less' : 'See more'}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <MoreInformationPanel
                user={user}
                time={time}
                requestedDates={requestedDates}
                response={response}
                status={status}
              />
            </AccordionItem>
          </Accordion>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequestPTO;
