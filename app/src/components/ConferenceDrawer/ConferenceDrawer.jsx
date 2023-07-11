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
  Textarea,
} from '@chakra-ui/react';
import FloorTypes from '../../constants/FloorTypes';
import ConferenceRooms from '../../constants/ConferenceRooms';
import GenerateDayOfTheWeek from './GenerateDayOfTheWeek/GenerateDayOfTheWeek';
import RadioButtonGroup from './RadioButtonGroup';
import GenerateMarkerColor from './GenerateMarkerColor/GenerateMarkerColor';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function ConferenceDrawer({ btnRef, isOpen, onClose }) {
  const [switchIsChecked, setSwitchIsChecked] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [selectedConference, setSelectedConference] =
    useState('01 Conference Room');
  const toast = useToast();

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
                {Object.values(FloorTypes).map((type, index) => (
                  <option placeholder={type} key={index}>
                    {type}
                  </option>
                ))}
              </Select>
              <Box mb={2} mt={3}>
                Choose a conference room
              </Box>
              <Select
                size="md"
                onChange={(event) => setSelectedConference(event.target.value)}
              >
                {Object.values(ConferenceRooms).map((type, index) => (
                  <option value={type} key={index}>
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
                <Switch
                  isChecked={switchIsChecked}
                  colorScheme="purple"
                  onChange={(event) => setSwitchIsChecked(event.target.checked)}
                />
                <FormLabel htmlFor="reservation" mb="0" ml={3}>
                  Repeat reservation
                </FormLabel>
              </FormControl>
              <GenerateDayOfTheWeek switchIsChecked={switchIsChecked} />
              <Box mt={3}>
                <Checkbox
                  colorScheme="purple"
                  isDisabled={switchIsChecked ? false : true}
                >
                  Every day
                </Checkbox>
              </Box>
              <Text
                fontSize="md"
                mt={3}
                color={switchIsChecked ? 'gray.700' : 'gray.200'}
              >
                Ends
              </Text>
              <RadioButtonGroup
                switchIsChecked={switchIsChecked}
                f_option="Never"
                s_option="After"
                t_option="On specific date"
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                setSelectedDate={setSelectedDate}
              />
            </Box>
            <Divider />
            <Box p={6}>
              <Text fontSize="md" mb={1} fontWeight={'400'}>
                Title
              </Text>
              <Input placeholder="Please enter a title..." />
              <Text fontSize="md" mb={1} fontWeight={'400'} mt={3}>
                Description
              </Text>
              <Textarea
                placeholder={'Please enter a description...'}
                h={'20'}
              />
              <Text mt={3} fontSize="md">
                Choose marker color
              </Text>
              <GenerateMarkerColor />
            </Box>
          </DrawerBody>

          <Divider />
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => {
                toast({
                  position: 'top-right',
                  variant: 'subtle',
                  status: 'warning',
                  description: `You have deleted the reservation of ${selectedConference} for the date ${selectedDate} from ${startTime} to ${endTime}`,
                });
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}