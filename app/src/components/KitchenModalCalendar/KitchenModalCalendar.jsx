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
} from '@chakra-ui/react'

const KitchenModalCalendar = ({
    isOpen,
    onClose,
    selectDate,
    setChooseDateValue,
    setSelectDate,
}) => {
    
    return(
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Calendar  
            className="custom-calendar-history"
            minDate={new moment().format('YYYY-MM-DD')}
            onChange={(date) => setSelectDate(String(date))} />
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme='purple' 
              mr={3} 
              onClick={onClose}>
              Close
            </Button>
            <Button 
              variant='outline' 
              colorScheme='purple' 
              onClick={() => {
              setChooseDateValue(selectDate);
              onClose();}}>Choose</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}

export default KitchenModalCalendar;