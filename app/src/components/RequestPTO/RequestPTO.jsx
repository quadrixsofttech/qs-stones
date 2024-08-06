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
  useDisclosure,
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { useContext, useEffect, useState } from 'react';
import RequestStatus from './RequestStatus/RequestStatus';
import { MoreInformationPanel } from './MoreInformationPanel';
import statusTypes from './status';
import { BiTrash } from 'react-icons/bi';
import { useRemoteRequestDeletion } from './../../hooks/useRemoteRequestDeletion';
import { BsThreeDots } from 'react-icons/bs';
import ConfirmationModal from './ConfirmationModal';
import { DatesContext } from '../../context/DatesContext';
import { RequestPTOModal } from '../RequestPTOModal/RequestPTOModal';

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
  setRefetchCalendarData,
  refetchCalendarData,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { deleteRemoteRequest } = useRemoteRequestDeletion(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const { setId, setEditMode, isEditMode } = useContext(DatesContext);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleRequestDeletion = async () => {
    try {
      await deleteRemoteRequest.mutateAsync(id);
      setRefetchCalendarData((prevState) => !prevState);
    } catch (error) {
      throw new Error('Error in deleting remote request');
    }
  };

  const handleOpen = () => {
    onOpen();
  };

  const handleEdit = (id) => {
    onOpenEdit();
    setId(id);
    setEditMode(true);
  };

  useEffect(() => {
    refetchPTO();
  }, [refetchCalendarData, refetchPTO]);

  return (
    <Box {...styles.box}>
      <Box as="span">
        <Flex>
          <Text {...styles.grayText}>{time}</Text>
          <Spacer />
          {type === 'remote' ? (
            <Icon
              as={BiTrash}
              boxSize={5}
              color={'red.300'}
              onClick={handleOpen}
              _hover={{
                color: 'red.500',
              }}
            />
          ) : status === 'pending' ? (
            <Flex gap={1}>
              <Icon
                as={BsThreeDots}
                boxSize={5}
                onClick={() => handleEdit(id)}
                _hover={{
                  color: 'purple.500',
                }}
              />
              <Icon
                as={BiTrash}
                boxSize={5}
                color={'red.300'}
                onClick={handleOpen}
                _hover={{
                  color: 'red.500',
                }}
              />
            </Flex>
          ) : (
            ''
          )}
        </Flex>
        <ConfirmationModal
          isOpen={isOpen}
          onClose={onClose}
          handleRequestDeletion={handleRequestDeletion}
        />
        {isEditMode && (
          <RequestPTOModal
            isOpenEdit={isOpenEdit}
            onCloseEdit={onCloseEdit}
            setRefetchCalendarData={setRefetchCalendarData}
            handleRequestDeletion={handleRequestDeletion}
          />
        )}
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
