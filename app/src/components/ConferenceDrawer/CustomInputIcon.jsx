import { Icon } from '@chakra-ui/react';
import React from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';

export default function CustomInputIcon(props) {
  return <Icon as={AiTwotoneCalendar} {...props} />;
}
