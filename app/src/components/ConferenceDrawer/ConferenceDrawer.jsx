import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Select,
} from '@chakra-ui/react';
import FloorTypes from '../../constants/FloorTypes';
import ConferenceRooms from '../../constants/ConferenceRooms';
import DatePicker from 'react-multi-date-picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import './input-calendar-field.css';

export default function ConferenceDrawer({ btnRef, isOpen, onClose }) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Reserve Conference Room</DrawerHeader>
          <Divider />
          <DrawerBody>
            <Box mb={2}>Choose a floor</Box>
            <Select size="md">
              {Object.values(FloorTypes).map((type) => (
                <option placeholder={type} key={FloorTypes.id + '-' + type}>
                  {type}
                </option>
              ))}
            </Select>
            <Box mb={2} mt={3}>
              Choose a conference room
            </Box>
            <Select size="md">
              {Object.values(ConferenceRooms).map((type) => (
                <option
                  placeholder={type}
                  key={ConferenceRooms.id + '-' + type}
                >
                  {type}
                </option>
              ))}
            </Select>
            <Box mb={2} mt={3}>
              Start at:
            </Box>
            <DatePicker className="custom-calendar" render={<InputIcon />} />
            <Box mb={2} mt={3}>
              End at:
            </Box>
            <DatePicker className="custom-calendar" render={<InputIcon />} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="purple">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}