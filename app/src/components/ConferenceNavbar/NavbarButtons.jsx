import { Box, Divider, Flex } from '@chakra-ui/react';
import { ButtonTypes, TodayButtonType } from './constants/ButtonTypes';
import { useState } from 'react';
import styles from './NavbarButtons.styles';

export default function NavbarButtons() {
  const [active, setActive] = useState(false);
  const [activeToday, setActiveToday] = useState(false);
  const handleClick = (label) => {
    setActive(label);
  };

  return (
    <Flex gap={3}>
      <Box
        {...styles.buttonStyles}
        onClick={() => setActiveToday(!activeToday)}
        color={activeToday ? 'purple.700' : 'black'}
        bg={activeToday ? 'purple.50' : 'white'}
      >
        {TodayButtonType.TODAY}
      </Box>
      <Divider orientation="vertical" h={8} />
      {Object.values(ButtonTypes).map((type) => {
        return (
          <Box
            {...styles.buttonStyles}
            key={type}
            onClick={() => handleClick(type)}
            color={active === type ? 'purple.700' : 'black'}
            bg={active === type ? 'purple.50' : 'white'}
          >
            {type}
          </Box>
        );
      })}
    </Flex>
  );
}
