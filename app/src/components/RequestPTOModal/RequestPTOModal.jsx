import {
  Box,
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
  useToast,
} from '@chakra-ui/react';
import styles from './styles/RequestPTOModal.styles';
import { Calendar } from 'react-multi-date-picker';
import { useContext, useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
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
import ClearAllBtn from './ClearAllBtn';
import {
  validatePTOConditions,
  validateTimeOffType,
  validateVacationDates,
} from './helpers';
import { Header } from './Header';
import { Footer } from './Footer';

export const RequestPTOModal = ({
  isOpen,
  onClose,
  isOpenEdit,
  onCloseEdit,
  setRefetchCalendarData,
  handleRequestDeletion,
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
    isEditMode ? capitalizeFirstLetter(matchingRequest?.type) : undefined
  );
  const [selectedPaidTimeOffType, setSelectedPaidTimeOffType] =
    useState(undefined);
  const toast = useToast();

  const handleToggleRefetch = () => {
    setRefetchCalendarData((prevRefetch) => !prevRefetch);
  };

  const showToast = (title, description, status, colorScheme) => {
    toast({
      title,
      description,
      position: 'top-right',
      status,
      isClosable: true,
      colorScheme,
      variant: 'subtle',
    });
  };

  const handleSubmitOnEdit = async () => {
    try {
      await editPTO({
        id: matchingRequest?._id,
        type: selectedTimeOffType.toLowerCase(),
        dates: VacationDates,
      });
      if (VacationDates.length === 0) {
        handleRequestDeletion();
      }
      showToast(
        'Success',
        'You have successfully updated your request.',
        'success',
        'green'
      );
      handleToggleRefetch();
      onCloseEdit();
    } catch (err) {
      showToast(
        'Something went wrong',
        'Error in updating request.',
        'error',
        'red'
      );
    }
  };

  const submitTORequest = async () => {
    try {
      if (!validateVacationDates(VacationDates)) {
        showToast(
          'Warning',
          'Please select valid dates. You have selected only the starting date.',
          'error',
          'yellow'
        );
        return;
      }

      if (!validateTimeOffType(selectedTimeOffType)) {
        showToast(
          'Warning',
          'Please select a time off type',
          'warning',
          'yellow'
        );
        return;
      }

      if (VacationDates.length >= 1) {
        if (validatePTOConditions(VacationDates, selectedTimeOffType)) {
          showToast(
            'Something went wrong',
            'Number of paid time off days exceeds the limit',
            'error',
            'red'
          );
          return;
        }

        await createPTO.mutateAsync({
          dates: VacationDates,
          type: selectedTimeOffType.toLowerCase(),
          paidLeaveType: selectedPaidTimeOffType || undefined,
          status: 'pending',
          userId: user._id,
          reviewerId: null,
          comment: '',
        });

        handleToggleRefetch();
        showToast(
          'Success',
          'You have submitted a request to the Admins for scheduling time off work',
          'success',
          'green'
        );

        setVacationDates([]);
        setSelectedTimeOff(null);
        onClose();
      }
    } catch (err) {
      showToast(
        'Error',
        err.response?.data?.message || 'Something went wrong',
        'error',
        'red'
      );
    }
  };

  const handleClose = () => {
    setVacationDates([]);
    setSelectedTimeOff(null);
    isEditMode ? onCloseEdit() : onClose();
    setEditMode(false);
  };

  if (adminsLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      isCentered
      isOpen={isEditMode ? isOpenEdit : isOpen}
      onClose={handleClose}
      motionPreset="slideInBottom"
      size={'3xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader {...styles.modalHeader}>
          <Header isEditMode={isEditMode} />
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
            {selectedTimeOffType === 'Paid time off' && (
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
          <Box marginTop={'2'} height={'20px'}>
            {VacationDates.length >= 2 && (
              <ClearAllBtn handleClick={() => setVacationDates([])} />
            )}
          </Box>
          <ModalFooter>
            <Footer
              isEditMode={isEditMode}
              onCloseEdit={onCloseEdit}
              onClose={onClose}
              setEditMode={setEditMode}
              handleSubmitOnEdit={handleSubmitOnEdit}
              submitTORequest={submitTORequest}
              setVacationDates={setVacationDates}
            />
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
