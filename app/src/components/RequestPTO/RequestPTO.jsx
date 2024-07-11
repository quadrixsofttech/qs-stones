import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { useState } from 'react';
import RequestStatus from './RequestStatus/RequestStatus';
import { MoreInformationPanel } from './MoreInformationPanel';
import statusTypes from './status';

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
    type !== 'remote' && (
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
                <Text as="h2">
                  <AccordionButton onClick={toggleAccordion}>
                    <Box color={'gray.500'}>
                      {isAccordionOpen ? 'See less' : 'See more'}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <MoreInformationPanel
                  user={user}
                  time={time}
                  requestedDates={requestedDates}
                  response={response}
                  status={status}
                  type={type}
                />
              </AccordionItem>
            </Accordion>
          </Flex>
        </Box>
      </Box>
    )
  );
};

export default RequestPTO;
