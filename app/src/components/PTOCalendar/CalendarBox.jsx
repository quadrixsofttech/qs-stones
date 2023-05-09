import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import styles from './PTOCalendar.styles';
import { useState } from 'react';

const CalendarBox = ({ boxFullDate, day, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return boxFullDate === formattedDate;
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <PopoverTrigger>
        <Flex
          border={'1px'}
          borderColor={isOpen ? 'purple.500' : 'gray.200'}
          padding={'8px'}
          backgroundColor={isToday() ? 'purple.50' : 'white'}
          _hover={{ ...styles.onHoverBox }}
        >
          <Flex flexDirection={'column'}>
            <Box
              textColor={'gray.700'}
              fontWeight={'semibold'}
              marginBottom={'8px'}
            >
              {day}
            </Box>
            <Box>{children}</Box>
          </Flex>
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize={'lg'} fontWeight={'bold'} color={'gray.700'}>
          Remote : {boxFullDate}{' '}
          {/* Ovde dinamicka dodela, da li je remote u pitanju ili PTO */}
        </PopoverHeader>
        <PopoverBody>
          <Flex flexDirection={'column'} gap={'15px'} paddingTop={'10px'}>
            <Flex alignItems={'center'} gap={'10px'}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Text>Ryan Florence</Text>
            </Flex>
            <Flex alignItems={'center'} gap={'10px'}>
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Text>Segun Adebayo</Text>
            </Flex>
            <Flex alignItems={'center'} gap={'10px'}>
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Text>Kent Dodds</Text>
            </Flex>
            <Flex alignItems={'center'} gap={'10px'}>
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Text>Prosper Otemuyiwa</Text>
            </Flex>
            <Flex alignItems={'center'} gap={'10px'}>
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
              <Text>Christian Nwamba</Text>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarBox;
