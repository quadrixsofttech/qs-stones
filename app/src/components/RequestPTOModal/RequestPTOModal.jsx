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
  Select,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import styles from './RequestPTOModal.styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Calendar } from 'react-multi-date-picker';
import { useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { InfoIcon } from '@chakra-ui/icons';
import useUser from '../../hooks/useUser';
import useEmployees from '../../hooks/useEmployees';
import moment from 'moment';
import { RenderRangeTags } from './RenderRangeTags';
import { timeOffTypes } from '../../constants/TimeOffTypes';
import { paidTimeOffTypes } from '../../constants/PaidTimeOffTypes';
import useAdmins from '../../hooks/useAdmins';

export const RequestPTOModal = ({ isOpen, onClose }) => {
  const {
    VacationDates,
    setVacationDates,
    handleVacationDates,
    removeVacationTag,
  } = useCalendar();

  const { user } = useUser();
  const { adminsLoading } = useAdmins();
  const { createPTO } = useEmployees();

  const [selectedTimeOffType, setSelectedTimeOff] = useState(null);
  const [selectedPaidTimeOffType, setSelectedPaidTimeOffType] =
    useState(undefined);
  const toast = useToast();

  if (adminsLoading) {
    return <Spinner />;
  }

  const submitTORequest = async () => {
    try {
      if (VacationDates.length > 0) {
        if (
          VacationDates.length > 5 &&
          selectedTimeOffType === 'Paid time off'
        ) {
          toast({
            title: 'Something went wrong',
            description: 'Number of paid time off days succeeds the limit',
            position: 'top-right',
            status: 'error',
            isClosable: true,
            colorScheme: 'red',
            variant: 'subtle',
          });
        }
        await createPTO.mutateAsync({
          dates: VacationDates,
          type: selectedTimeOffType.toLowerCase(),
          paidLeaveType: selectedPaidTimeOffType
            ? selectedPaidTimeOffType
            : undefined,
          status: 'pending',
          userId: user._id,
          reviewerId: null,
          comment: '',
        });
        toast({
          title: 'Success',
          description:
            'You have submitted a request to the Admins for scheduling time off work',
          position: 'top-right',
          status: 'success',
          isClosable: true,
          colorScheme: 'green',
          variant: 'subtle',
        });
        setVacationDates([]);
        setSelectedTimeOff(null);
        onClose();
      } else {
        toast({
          title: 'Warning',
          description: 'Please select a date',
          position: 'top-right',
          status: 'warning',
          isClosable: true,
          colorScheme: 'Yellow',
          variant: 'subtle',
        });
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: err.message,
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
        setVacationDates([]);
        setSelectedTimeOff(null);
        onClose();
      }}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent {...styles.modalContent}>
        <Scrollbars style={{ height: '100%' }}>
          <ModalHeader {...styles.modalHeader}>Paid Time Off</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={2} alignItems={'center'}>
              <Text {...styles.modalTitle}>Time off</Text>
              <Tooltip
                label="*Double-click to select a date on the calendar. 
                  *Single-click to select a range of dates on the calendar."
                hasArrow
                placement="right"
              >
                <InfoIcon color={'gray.400'} mt="1" />
              </Tooltip>
            </Flex>
            <Flex gap="4">
              <Select
                mt={2}
                mb={2}
                onChange={(e) => {
                  setSelectedTimeOff(e.target.value);
                }}
                placeholder="Select type of time off"
              >
                {Object.values(timeOffTypes).map((type) => {
                  return (
                    <option value={type} key={type}>
                      {`${type}`}
                    </option>
                  );
                })}
              </Select>
              {selectedTimeOffType === 'Paid Time off' && (
                <>
                  <Select
                    mt={2}
                    mb={2}
                    onChange={(e) => {
                      setSelectedPaidTimeOffType(e.target.value);
                    }}
                    placeholder="Select type of time off"
                  >
                    {Object.values(paidTimeOffTypes).map((type) => {
                      return (
                        <option value={type} key={type}>
                          {`${type}`}
                        </option>
                      );
                    })}
                  </Select>
                </>
              )}
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Calendar
                minDate={new moment().format('YYYY-MM-DD')}
                range
                numberOfMonths={2}
                multiple
                onChange={handleVacationDates}
                value={VacationDates}
                className="custom-calendar"
              />
            </Flex>
            <Text {...styles.textRequestDates}>
              Requested dates for Vacation:
            </Text>
            {VacationDates.map((x) => {
              return (
                <RenderRangeTags
                  range={x}
                  key={Math.random()}
                  handleClose={() => removeVacationTag(x)}
                />
              );
            })}
            <ModalFooter>
              <>
                <Button onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    submitTORequest();
                  }}
                  {...styles.button}
                >
                  Submit Request
                </Button>
              </>
            </ModalFooter>
          </ModalBody>
        </Scrollbars>
      </ModalContent>
    </Modal>
  );
};
