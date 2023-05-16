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
import RequestApproved from '../RequestStatus/RequestApproved/RequestApproved';
import RequestDenied from '../RequestStatus/RequestDenied/RequestDenied';
import { useState } from 'react';
import RequestPending from './../RequestStatus/RequestPending/RequestPending';
import status from './status';
import { ApprovedPanel } from './ApprovedPanel/ApprovedPanel';
import { RejectedPanel } from './RejectedPanel/RejectedPanel';
import employees from '../MyHistory/information';

const RequestPTO = ({ requestStatus = status.pending, request }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Box {...styles.box}>
          <Box as="span">
            <Text {...styles.gray_text}>{request.time}</Text>
            <Text {...styles.main_text}>
              You sent Request PTO/Remote to{' '}
              <Text {...styles.admin_text} as="span">
                {request.user.name}
                {' ('}
                {request.user.role}
                {')'}
              </Text>
            </Text>
            <Text display={'inline'} {...styles.gray_text}>
              Requested Dates:{' '}
              <Text display={'inline'} as="span">
                {request.requestedDates.join('; ')}
              </Text>
            </Text>
            <Box pt={2}>
              {requestStatus === status.pending ? (
                <RequestPending />
              ) : requestStatus === status.approved ? (
                <RequestApproved />
              ) : (
                <RequestDenied />
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
                      <ApprovedPanel request={request}/>
                    </AccordionPanel>
                  ) : (
                    <AccordionPanel {...styles.accordionpanel}>
                      <RejectedPanel request={request} />
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
