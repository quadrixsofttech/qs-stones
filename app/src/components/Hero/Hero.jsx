import { Link } from 'react-router-dom';

import { Stack, Flex, Button, Text, VStack } from '@chakra-ui/react';
import styles from './Hero.styles';

const Hero = ({ title, buttonTitle, buttonLink }) => {
  return (
    <Flex {...styles.wrapper}>
      <VStack {...styles.vStack}>
        <Stack {...styles.content}>
          <Text {...styles.title}>{title}</Text>
          <Stack>
            <Button as={Link} to={buttonLink} {...styles.button}>
              {buttonTitle}
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Hero;
