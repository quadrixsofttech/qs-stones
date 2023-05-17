import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { useState } from 'react';
import employees from '../MyHistory/information';
import RequestStatus from './RequestStatus/RequestStatus';
import { MoreInformationPanel } from './MoreInformationPanel';
import status from './status';

const RequestPTO = ({
  requestStatus = status.pending,
  type,
  time,
  user,
  requestedDates,
  response,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Box {...styles.box}>
      <Box as="span">
        <Text {...styles.gray_text}>{time}</Text>
        <Text {...styles.main_text}>
          You sent Request PTO/Remote to{' '}
          <Text {...styles.admin_text} as="span">
            {user.name}
            {' ('}
            {user.role}
            {')'}
          </Text>
        </Text>
        <Text display={'inline'} {...styles.gray_text}>
          Requested Dates:{' '}
          <Text display={'inline'} as="span">
            {requestedDates.join('; ')}
          </Text>
        </Text>
        <Box pt={2}>
          {requestStatus === status.pending ? (
            <RequestStatus name="PENDING" color="yellow.800" bg="yellow.100" />
          ) : requestStatus === status.approved ? (
            <RequestStatus name="APPROVED" color="green.800" bg="green.100" />
          ) : (
            <RequestStatus name="REJECTED" color="red.800" bg="red.100" />
          )}
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
              {requestStatus === status.pending ? (
                <AccordionPanel {...styles.accordionpanel}>
                  <Text color={'gray.500'}>{employees.requestDate}</Text>
                  <Text>Your Request is pending</Text>
                </AccordionPanel>
              ) : requestStatus === status.approved ? (
                <AccordionPanel {...styles.accordionpanel}>
                  <MoreInformationPanel
                    user={user}
                    requestedDates={requestedDates}
                    requestStatus="approved"
                  />
                </AccordionPanel>
              ) : (
                <AccordionPanel {...styles.accordionpanel}>
                  <MoreInformationPanel
                    user={user}
                    requestedDates={requestedDates}
                    requestStatus="rejected"
                    response={response}
                  />
                </AccordionPanel>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequestPTO;
