import { Flex, Heading, Button, Spacer, Tag } from '@chakra-ui/react';
import styles from './KitchenHeader.styles';
import moment from 'moment';

const KitchenHeader = ({ onOpen, chooseDateValue, activeStep }) => {
  return (
    <Flex pb={'2'}>
      <Heading size="xl" ml="3.5">
        {activeStep == 0
          ? 'Choose main dish'
          : activeStep == 1
          ? 'Choose salad'
          : 'Review'}
      </Heading>
      <Spacer />
      {activeStep < 2 && (
        <Flex>
          <Tag {...styles.rangeTag}>
            {chooseDateValue === ''
              ? new moment().format('YYYY/MM/DD')
              : chooseDateValue}
          </Tag>
          <Button {...styles.buttonChooseDay} onClick={onOpen}>
            Choose day
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default KitchenHeader;
