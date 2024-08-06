import { Flex, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import styles from './styles/RequestPTOModal.styles';
import { InfoIcon } from '@chakra-ui/icons';

export const Header = ({ isEditMode }) => {
  return (
    <Flex gap={2} alignItems={'center'}>
      <Text {...styles.modalTitle}>
        {isEditMode ? 'Change Dates or Type of Request' : 'Time off'}
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
  );
};
