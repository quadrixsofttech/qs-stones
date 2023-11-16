import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import Colors from '../../../constants/Colors';
import DefaultColor from '../assets/no_color.png';
import styles from './GenerateMarkerColor.styles';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export default function GenerateMarkerColor() {
  const { values, setFieldValue } = useFormikContext();
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorClick = (color) => {
    setSelectedColor(color === selectedColor ? selectedColor : color);
    let stringColor = color.replace(/\.\d+$/, '');
    setFieldValue('markerColor', stringColor);
  };

  useEffect(() => {
    setSelectedColor(values.markerColor);
  }, [values.markerColor]);

  console.log(values.markerColor);

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={3}>
      <Image src={DefaultColor} />
      {Object.values(Colors).map((color, index) => (
        <Box
          {...styles.markerColor}
          bgColor={color}
          key={index}
          border={
            values.markerColor === selectedColor
              ? '3px solid'
              : '3px solid transparent'
          }
          borderColor={selectedColor === color ? 'purple.500' : 'transparent'}
          onClick={() => {
            handleColorClick(color);
            setFieldValue('markerColor', color);
          }}
        ></Box>
      ))}
    </Flex>
  );
}
