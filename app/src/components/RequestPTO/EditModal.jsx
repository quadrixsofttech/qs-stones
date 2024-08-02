import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Select,
  Input,
  Box,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { timeOffTypes } from '../../constants/TimeOffTypes';
import { useState } from 'react';
import { usePaidTimeOff } from '../../hooks/usePTO';
import useUser from '../../hooks/useUser';
import { capitalizeFirstLetter, convertTimestampToDate } from '../../util';

export default function EditModal({ isOpen, onClose, requestId }) {
  const { user } = useUser();
  const { paidTimeOffHistory } = usePaidTimeOff(user._id);

  const matchingRequest = paidTimeOffHistory.find(
    (request) => request._id === requestId
  );

  const [selectedTimeOffType, setSelectedTimeOff] = useState(
    matchingRequest ? capitalizeFirstLetter(matchingRequest.type) : null
  );
  if (!matchingRequest) return null;

  const startDate = convertTimestampToDate(matchingRequest.dates[0][0]);
  const endDate = convertTimestampToDate(matchingRequest.dates[0][1]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change date or type of request</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Select
            mt={2}
            mb={2}
            onChange={(e) => setSelectedTimeOff(e.target.value)}
            value={selectedTimeOffType}
            placeholder="Select type of time off"
          >
            {Object.values(timeOffTypes).map((type) => {
              return (
                <option value={type} key={type}>
                  {capitalizeFirstLetter(type)}
                </option>
              );
            })}
          </Select>
          <Divider mt={4} mb={2} />
          {/* Ispitati da li bi radilo da je type='date' u input field */}
          <Flex gap={4}>
            <Box>
              <Text>Start date:</Text>
              <Input value={startDate} />
            </Box>
            <Box>
              <Text>End date:</Text>
              <Input value={endDate} />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="purple" ml={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
