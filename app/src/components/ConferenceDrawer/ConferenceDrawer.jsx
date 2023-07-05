import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Input,
} from '@chakra-ui/react';
import FloorTypes from '../../constants/FloorTypes';
import ConferenceRooms from '../../constants/ConferenceRooms';
import GenerateDayOfTheWeek from './GenerateDayOfTheWeek';
import RadioButtonGroup from './RadioButtonGroup';

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
          <DrawerBody p={0}>
            <Box p={6}>
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
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
              />
              <Box mb={2} mt={3}>
                End at:
              </Box>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
              />
            </Box>
            <Divider />
            <Box p={6}>
              <FormControl display="flex" alignItems="center">
                <Switch id="reservation" colorScheme="purple" />
                <FormLabel htmlFor="reservation" mb="0" ml={3}>
                  Repeat reservation
                </FormLabel>
              </FormControl>
              <GenerateDayOfTheWeek />
              <Box mt={3}>
                <Checkbox colorScheme="purple">Every day</Checkbox>
              </Box>
              <Text fontSize="md" mt={3}>
                Ends
              </Text>
              <RadioButtonGroup
                f_option="Never"
                s_option="After"
                t_option="On specific date"
              />
            </Box>
          </DrawerBody>

          <Divider />
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
