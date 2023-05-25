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
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <Box {...styles.box}>
      <Box as="span">
        <Text {...styles.grayText}>{time}</Text>
        <Text {...styles.mainText}>
          You sent Request PTO/Remote to {' '}
          <Text {...styles.adminText} as="span">
            {user.name}({user.role})
          </Text>
        </Text>
        <Text display={'inline'} {...styles.grayText}>
          Requested Dates:
          <Text display={'inline'} as="span">
            {requestedDates.join('; ')}
          </Text>
        </Text>
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
