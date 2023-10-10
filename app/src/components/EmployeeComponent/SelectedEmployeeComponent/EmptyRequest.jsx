import React from 'react';
import styles from './SelectedEmployeeComponent.styles';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const EmptyRequest = ({ image, label, description }) => {
  return (
    <Flex {...styles.mainBox}>
      <Flex {...styles.messageBox}>
        {image && (
          <Box width={'200px'}>
            <Image src={image} alt="Empty Inbox" />
          </Box>
        )}
        <Text fontWeight={'bold'} color={'gray.700'}>
          {label}
        </Text>
        <Text {...styles.textBox}>{description}</Text>
      </Flex>
    </Flex>
  );
};
export default EmptyRequest;
