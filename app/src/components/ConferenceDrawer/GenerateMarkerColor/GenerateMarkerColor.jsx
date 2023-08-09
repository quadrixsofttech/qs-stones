import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import Colors from '../../../constants/Colors';
import DefaultColor from '../assets/no_color.png';
import styles from './GenerateMarkerColor.styles';

export default function GenerateMarkerColor() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={3}>
      <Image src={DefaultColor} />
      {Object.values(Colors).map((color, index) => (
        <Box
          {...styles.markerColor}
          bgColor={color}
          key={index}
          border={
            selectedColor === color ? '3px solid' : '3px solid transparent'
          }
          borderColor={selectedColor === color ? 'purple.500' : 'transparent'}
          onClick={() => handleColorClick(color)}
        ></Box>
      ))}
    </Flex>
  );
}
