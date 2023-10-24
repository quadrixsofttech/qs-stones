import { Flex, Heading, Button, Spacer, Text } from '@chakra-ui/react';
import styles from './KitchenHeader.styles';

const KitchenHeader = ({ onOpen, chooseDateValue }) => {
  return (
    <Flex>
      <Heading size="2xl" ml="14px" positon="fixed">
        Choose dish
      </Heading>
      <Spacer />
      <Text mr="12px" fontWeight="bold" fontSize="30px">
        {chooseDateValue}
      </Text>
      <Button {...styles.buttonChooseDay} onClick={onOpen}>
        Choose day
      </Button>
    </Flex>
  );
};

export default KitchenHeader;
