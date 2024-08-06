import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Divider,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import styles from './RequestPTO.styles';
import { useContext, useEffect, useState } from 'react';
import RequestStatus from './RequestStatus/RequestStatus';
import { MoreInformationPanel } from './MoreInformationPanel';
import statusTypes from './status';
import { useRemoteRequestDeletion } from './../../hooks/useRemoteRequestDeletion';
import ConfirmationModal from './ConfirmationModal';
import { DatesContext } from '../../context/DatesContext';
import { RequestPTOModal } from '../RequestPTOModal/RequestPTOModal';
import { RenderIcons } from './RenderIcons';
import { RequestInformation } from './RequestInformation';

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
          <RenderIcons
            time={time}
            type={type}
            id={id}
            status={status}
            handleEdit={handleEdit}
            handleOpen={handleOpen}
          />
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
        <RequestInformation
          status={status}
          type={type}
          requestedDates={requestedDates}
          user={user}
        />
        <Text fontWeight={'bold'}>
          {type !== 'remote' && numberOfDays + ' days'}
        </Text>
        {type === 'remote' && <Divider mt={2} />}
        {type !== 'remote' && (
          <>
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
            <Divider />
          </>
        )}
      </Box>
    </Box>
  );
};

export default RequestPTO;
