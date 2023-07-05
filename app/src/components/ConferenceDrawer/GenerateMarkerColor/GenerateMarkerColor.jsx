import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import Colors from '../../../constants/Colors';
import DefaultColor from '../assets/no_color.png';
import styles from './GenerateMarkerColor.styles';

export default function GenerateMarkerColor() {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={3}>
      <Image src={DefaultColor} />
      {Object.values(Colors).map((color, index) => (
        <Box {...styles.markerColor} bgColor={color} key={index}></Box>
      ))}
    </Flex>
  );
}
