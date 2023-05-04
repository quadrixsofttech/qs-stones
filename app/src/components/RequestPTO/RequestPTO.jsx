import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Textarea,
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import RequestApproved from '../RequestStatus/RequestApproved/RequestApproved';
import RequestDenied from '../RequestStatus/RequestDenied/RequestDenied';
import { useState } from 'react';
import { getCurrentDateTime } from '../../util/getCurrentTime';

const RequestPTO = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const isRequestApproved = false;

  return (
    <Box {...styles.box}>
      <Text {...styles.gray_text}>{getCurrentDateTime()}</Text>
      <Text {...styles.main_text}>
        You sent Request PTO/Remote to
        <Text fontWeight={'bold'}>Milos Stosic(ADMIN)</Text>
      </Text>
      <Text display={'inline'} {...styles.gray_text}>
        Requested Dates: <Text display={'inline'}>23/4/2022</Text>
      </Text>
      <Box pt={2}>
        {isRequestApproved ? <RequestApproved /> : <RequestDenied />}
      </Box>
      <Flex alignItems={'center'}>
        <Spacer />
        <Accordion defaultIndex={[1]} allowToggle>
          <AccordionItem pt={2}>
            <h2>
              <AccordionButton onClick={toggleAccordion}>
                <Box color={'gray.500'}>
                  {isAccordionOpen ? 'See less' : 'See more'}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {isRequestApproved ? (
              <AccordionPanel width={'20vw'}>
                <Text color={'gray.500'}>23/3/2022</Text>
                <Text fontWeight={'bold'}>
                  Milos Stosic(ADMIN) approved
                  <Text fontWeight={'normal'}>your Request PTO/Remote</Text>
                </Text>
              </AccordionPanel>
            ) : (
              <AccordionPanel width={'20vw'}>
                <Text color={'gray.500'}>23/3/2022</Text>
                <Text fontWeight={'bold'}>
                  Milos Stosic(ADMIN) rejected
                  <Text fontWeight={'normal'}>your Request PTO/Remote</Text>
                  <Flex flexDirection={'column'}>
                    <Textarea mt={2} placeholder="Explanation" width={200} />
                    <Button {...styles.button}>Send Request Again</Button>
                  </Flex>
                </Text>
              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      </Flex>
    </Box>
  );
};

export default RequestPTO;
