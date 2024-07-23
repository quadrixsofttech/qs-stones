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
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { useState } from 'react';
import RequestStatus from './RequestStatus/RequestStatus';
import { MoreInformationPanel } from './MoreInformationPanel';
import statusTypes from './status';
import { BiTrash } from 'react-icons/bi';
import { useRemoteRequestDeletion } from './../../hooks/useRemoteRequestDeletion';

const RequestPTO = ({
  status = statusTypes.pending,
  type,
  time,
  user,
  requestedDates,
  response,
  numberOfDays,
  id,
  refetchPTO,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { deleteRemoteRequest } = useRemoteRequestDeletion(id);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleRemoteDeletion = async () => {
    try {
      deleteRemoteRequest(id);
      refetchPTO();
    } catch (error) {
      throw new Error('Error in deleting remote request');
    }
  };

  return (
    <Box {...styles.box}>
      <Box as="span">
        <Flex>
          <Text {...styles.grayText}>{time}</Text>
          <Spacer />
          {type === 'remote' ? (
            <Icon
              as={BiTrash}
              boxSize={6}
              color={'red.300'}
              onClick={handleRemoteDeletion}
              _hover={{
                color: 'red.500',
              }}
            />
          ) : (
            ''
          )}
        </Flex>
        {status === 'pending' ? (
          <>
            <Text {...styles.mainText}>You sent a request for {type}</Text>
          </>
        ) : (
          <>
            {type === 'remote' ? (
              <Text {...styles.mainText}>
                Your request for remote has been approved
              </Text>
            ) : (
              <Text {...styles.mainText}>
                You sent request for {type} to
                <Text {...styles.adminText} as="span">
                  {' '}
                  {user?.firstName} {user?.lastName} (ADMIN)
                </Text>
              </Text>
            )}
          </>
        )}
        <Text fontWeight={'bold'}>{numberOfDays} days</Text>
        <Box pt={2}>
          <RequestStatus status={status} type={type} />
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
  );
};

export default RequestPTO;
