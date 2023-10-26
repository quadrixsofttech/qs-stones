import moment from 'moment';
import { Calendar } from 'react-multi-date-picker';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import styles from './KitchenModalCalendar.styles';

const KitchenModalCalendar = ({
  isOpen,
  onClose,
  selectDate,
  setChooseDateValue,
  setSelectDate,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose date</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Calendar
            className="custom-calendar-history"
            minDate={new moment().format('YYYY-MM-DD')}
            onChange={(date) => setSelectDate(String(date))}
          />
        </ModalBody>
        <ModalFooter>
          <Button {...styles.btnClose} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="purple"
            onClick={() => {
              setChooseDateValue(selectDate);
              window.localStorage.setItem(
                'selectDate',
                JSON.stringify(selectDate)
              );
              onClose();
            }}
          >
            Choose
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KitchenModalCalendar;
