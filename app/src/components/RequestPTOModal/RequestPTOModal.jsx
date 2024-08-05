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
import { Calendar } from 'react-multi-date-picker';
import { useContext, useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { InfoIcon } from '@chakra-ui/icons';
import useUser from '../../hooks/useUser';
import useEmployees from '../../hooks/useEmployees';
import moment from 'moment';
import { RenderRangeTags } from './RenderRangeTags';
import { timeOffTypes } from '../../constants/TimeOffTypes';
import { paidTimeOffTypes } from '../../constants/PaidTimeOffTypes';
import useAdmins from '../../hooks/useAdmins';
import { usePaidTimeOff } from './../../hooks/usePTO';
import { DatesContext } from '../../context/DatesContext';
import { capitalizeFirstLetter } from '../../util';
import { useEditPTO } from '../../hooks/useEditPTO';

export const RequestPTOModal = ({
  isOpen,
  onClose,
  isOpenEdit,
  onCloseEdit,
}) => {
  const { user } = useUser();
  const { paidTimeOffHistory } = usePaidTimeOff(user._id);
  const { isEditMode, requestPTOId, setEditMode } = useContext(DatesContext);
  const { editPTO } = useEditPTO();

  const matchingRequest = paidTimeOffHistory.find(
    (request) => request?._id === requestPTOId
  );

  const {
    VacationDates,
    setVacationDates,
    handleVacationDates,
    removeVacationTag,
  } = useCalendar(isEditMode, matchingRequest);

  const { adminsLoading } = useAdmins();
  const { createPTO } = useEmployees();

  const [selectedTimeOffType, setSelectedTimeOff] = useState(
    isEditMode ? capitalizeFirstLetter(matchingRequest?.type) : null
  );
  const [selectedPaidTimeOffType, setSelectedPaidTimeOffType] =
    useState(undefined);
  const toast = useToast();

  const handleSubmitOnEdit = () => {
    try {
      editPTO({
        id: matchingRequest?._id,
        type: selectedTimeOffType.toLowerCase(),
        dates: VacationDates,
      });
      toast({
        title: 'Success',
        description: 'You have successfully updated your request',
        position: 'top-right',
        status: 'success',
        isClosable: true,
        colorScheme: 'green',
        variant: 'subtle',
      });
      onCloseEdit();
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Error in updateing request',
        position: 'top-right',
        status: 'error',
        isClosable: true,
        colorScheme: 'red',
        variant: 'subtle',
      });
    }
  };

  if (adminsLoading) {
    return <Spinner />;
  }

  const submitTORequest = async () => {
    try {
      if (VacationDates.every((subarray) => subarray.length === 2)) {
        if (VacationDates.length >= 1) {
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
        }
      } else {
        toast({
          title: 'Warning',
          description: 'Please select a date',
          position: 'top-right',
          status: 'warning',
          isClosable: true,
          colorScheme: 'yellow',
          variant: 'subtle',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
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
      isOpen={isEditMode ? isOpenEdit : isOpen}
      onClose={() => {
        setVacationDates([]);
        setSelectedTimeOff(null);
        isEditMode ? onCloseEdit() : onClose();
        setEditMode(false);
      }}
      motionPreset="slideInBottom"
      size={'3xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader {...styles.modalHeader}>
          {' '}
          <Flex gap={2} alignItems={'center'}>
            <Text {...styles.modalTitle}>
              {isEditMode ? 'Change Dates or Type of Request' : 'Time off'}
            </Text>
            <Tooltip
              label="*Double-click to select a date on the calendar. 
                  *Single-click to select a range of dates on the calendar."
              hasArrow
              placement="right"
            >
              <InfoIcon color={'gray.400'} mt="1" />
            </Tooltip>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="4">
            <Select
              mt={2}
              mb={2}
              onChange={(e) => {
                setSelectedTimeOff(e.target.value);
              }}
              placeholder="Select type of time off"
              value={selectedTimeOffType}
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
                  value={
                    isEditMode
                      ? capitalizeFirstLetter(matchingRequest?.paidLeaveType)
                      : null
                  }
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
            Requested dates for time off:
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
              <Button
                onClick={() => {
                  isEditMode ? onCloseEdit() : onClose();
                  !isEditMode && setVacationDates([]);
                  setEditMode(false);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={isEditMode ? handleSubmitOnEdit : submitTORequest}
                {...styles.button}
              >
                Submit Request
              </Button>
            </>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
