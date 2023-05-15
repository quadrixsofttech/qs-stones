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
import moment from 'moment';
import employees from '../MyHistory/information';

const RequestPTO = ({ isRequestApproved = status.pending }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Box {...styles.box}>
      <Text {...styles.gray_text}>{moment().format('HH:mm:ss')}</Text>
      <Text {...styles.main_text}>
        You sent Request PTO/Remote to
        <Text {...styles.admin_text} as="span">{employees.admin[Math.floor(Math.random() * employees.admin.length)]}(ADMIN)</Text>
      </Text>
      <Text display={'inline'} {...styles.gray_text}>
        Requested Dates: <Text display={'inline'} as="span">{employees.requestDate}</Text>
      </Text>
      <Box pt={2}>
        {isRequestApproved === status.pending ? (
          <RequestPending />
        ) : isRequestApproved === status.approved ? (
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
            {isRequestApproved === status.pending ? (
              <AccordionPanel {...styles.accordionpanel}>
                <Text color={'gray.500'}>{employees.requestDate}</Text>
                <Text>Your Request is pending</Text>
              </AccordionPanel>
            ) : isRequestApproved === status.approved ? (
              <AccordionPanel {...styles.accordionpanel}>
                <ApprovedPanel />
              </AccordionPanel>
            ) : (
              <AccordionPanel {...styles.accordionpanel}>
                <RejectedPanel />
              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      </Flex>
    </Box>
  );
};

export default RequestPTO;
