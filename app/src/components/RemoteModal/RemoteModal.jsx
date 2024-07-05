import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useToast,
  Box,
} from '@chakra-ui/react';
import styles from '../RequestPTOModal/RequestPTOModal.styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Calendar } from 'react-multi-date-picker';
import { useCalendar } from '../../hooks/useCalendar';
import { InfoIcon } from '@chakra-ui/icons';
import useUser from '../../hooks/useUser';
import useEmployees from '../../hooks/useEmployees';
import moment from 'moment';
import { RenderRangeTags } from '../RequestPTOModal/RenderRangeTags';

export const RemoteModal = ({ isOpen, onClose,setRefetchCalendarData }) => {
  const { RemoteDates, setRemoteDates, handleRemoteDates, removeRemoteTag } =
    useCalendar();

  const { user } = useUser();
  const { createPTO } = useEmployees();

  const toast = useToast();

  const handleToggleRefetch = () => {
    setRefetchCalendarData(prevRefetch => !prevRefetch);
  }

  const submitRemote = async () => {
    if (RemoteDates.length >= 1) {
      await createPTO.mutateAsync({
        dates: RemoteDates,
        type: 'remote',
        status: 'approved',
        userId: user._id,
        reviewerId: null,
        comment: '',
      });
      toast({
        title: 'Success',
        description: 'You have scheduled work from home',
        position: 'top-right',
        status: 'success',
        isClosable: true,
        colorScheme: 'green',
        variant: 'subtle',
      });
      onClose();
      handleToggleRefetch();
    } else {
      toast({
        title: 'Error',
        description: 'You have to click on a date',
        position: 'top-right',
        status: 'error',
        isClosable: true,
        colorScheme: 'red',
        variant: 'subtle',
      });
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        setRemoteDates([]);
        onClose();
      }}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent {...styles.modalContent}>
        <Scrollbars style={{ height: '100%' }}>
          <ModalHeader {...styles.modalHeader}>
            Schedule when you will work from home
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={2} alignItems={'center'}>
              <Text {...styles.modalTitle}>Remote</Text>
              <Tooltip
                label="*Double-click to select a date on the calendar. 
                    *Single-click to select a range of dates on the calendar."
                hasArrow
                placement="right"
              >
                <InfoIcon color={'gray.400'} mt="1" />
              </Tooltip>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Calendar
                minDate={new moment().format('YYYY-MM-DD')}
                range
                numberOfMonths={2}
                multiple
                onChange={handleRemoteDates}
                value={RemoteDates}
                className="custom-calendar"
              />
            </Flex>
            <Box>
              <Text {...styles.textRequestDates}>
                Requested dates for Remote:
              </Text>
              {RemoteDates.map((x) => {
                return (
                  <RenderRangeTags
                    range={x}
                    key={Math.random()}
                    handleClose={() => removeRemoteTag(x)}
                  />
                );
              })}
              <Divider marginTop="4" />
            </Box>
            <ModalFooter>
              <>
                <Button onClick={onClose} variant={'outline'}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    submitRemote();
                  }}
                  {...styles.button}
                >
                  Submit
                </Button>
              </>
            </ModalFooter>
          </ModalBody>
        </Scrollbars>
      </ModalContent>
    </Modal>
  );
};
