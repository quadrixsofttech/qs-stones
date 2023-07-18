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
  Text,
  Tooltip,
} from '@chakra-ui/react';
import styles from './RequestPTOModal.styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Calendar } from 'react-multi-date-picker';
import { useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import RenderDates from './RenderDates';
import ProgressBar from './ProgessBar';
import { useCalendar } from '../../hooks/useCalendar';
import { InfoIcon } from '@chakra-ui/icons';

export const RequestPTOModal = ({ isOpen, onRequestSubmit, onClose }) => {
  const [isCurrentPageRemote, setIsCurrentPageRemote] = useState(true);

  const [
    RemoteDates,
    setRemoteDates,
    VacationDates,
    setVacationDates,
    handleRemoteDates,
    handleVacationDates,
    removeRemoteTag,
    removeVacationTag,
  ] = useCalendar();

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        setRemoteDates([]);
        setVacationDates([]);
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
            <ProgressBar isCurrentPageRemote={isCurrentPageRemote} />
            <Flex gap={2} alignItems={'center'}>
              <Text {...styles.modalTitle}>
                {isCurrentPageRemote ? 'Remote' : 'Vacation'}
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
            <Flex>
              {/* Temporary data, until getAdmins route is complete */}
              <Select mt={2} mb={2}>
                <option value="option" key={Math.random()}>
                  Milos Stosic (Admin)
                </option>
              </Select>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Calendar
                range
                numberOfMonths={2}
                multiple
                onChange={
                  isCurrentPageRemote ? handleRemoteDates : handleVacationDates
                }
                value={isCurrentPageRemote ? RemoteDates : VacationDates}
                className="custom-calendar"
              />
            </Flex>
            <RenderDates
              remotePage={isCurrentPageRemote}
              remoteDates={RemoteDates}
              vacationDates={VacationDates}
              handleClose={
                isCurrentPageRemote ? removeRemoteTag : removeVacationTag
              }
            />
            <ModalFooter>
              {isCurrentPageRemote ? (
                <>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    {...styles.button}
                    onClick={() => {
                      setIsCurrentPageRemote(false);
                    }}
                    rightIcon={<FaArrowRight size="12" />}
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setIsCurrentPageRemote(true);
                    }}
                    leftIcon={<FaArrowLeft size="12" />}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      onRequestSubmit();
                      setRemoteDates([]);
                      setVacationDates([]);
                      onClose();
                    }}
                    {...styles.button}
                    leftIcon={<BiUserPin />}
                  >
                    Submit Request
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalBody>
        </Scrollbars>
      </ModalContent>
    </Modal>
  );
};
