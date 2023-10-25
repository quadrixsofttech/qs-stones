import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import styles from './KitchenOverview.styles';
import { useTheme, Button } from '@chakra-ui/react';
import KitchenMealModal from './KitchenMealModal';
import { GiMeal } from 'react-icons/gi';
import { useState } from 'react';

const KitchenMeal = ({
  meal,
  isSelected,
  setLclSelectedMeal,
  isSelectedSalad,
  setLclSelectedSalad,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { _id, name, image, type, ingridients, desc } = meal;

  const chooseMeal = () => {
    if (meal.type === 'main dish') {
      setLclSelectedMeal(meal);
      window.localStorage.setItem('meal', JSON.stringify(meal));
    } else {
      setLclSelectedSalad(meal);
      window.localStorage.setItem('salad', JSON.stringify(meal));
    }
  };

  return (
    <Flex
      {...styles.mealCard}
      borderColor={isSelected || isSelectedSalad ? '#48BB78' : 'white'}
      borderWidth={3}
    >
      <Box overflow={'hidden'} sx={{ aspectRatio: '16/6' }} onClick={onOpen}>
        <Image {...styles.mealImage} src={image} />
      </Box>
      <Flex {...styles.mealInfo}>
        <Flex flexDir={'column'} gap="2">
          <Flex>
            <Heading {...styles.modalHeading}>
              <Icon as={GiMeal} mr="2" />
            </Heading>
            <Heading {...styles.heading}>{name}</Heading>
          </Flex>
          <Text {...styles.typeInfo}>
            Type:{' '}
            <Text as="span" fontWeight={'600'}>
              {type}
            </Text>
          </Text>
        </Flex>
        <Button
          colorScheme={isSelected || isSelectedSalad ? 'green' : 'purple'}
          {...styles.buttonChooseMeal}
          onClick={() => chooseMeal()}
        >
          {isSelected || isSelectedSalad ? 'Selected' : 'Choose meal'}
        </Button>
      </Flex>
      <KitchenMealModal
        isOpen={isOpen}
        onClose={onClose}
        isSelected={isSelected}
        setLclSelectedMeal={setLclSelectedMeal}
        isSelectedSalad={isSelectedSalad}
        setLclSelectedSalad={setLclSelectedSalad}
        meal={meal}
      />
    </Flex>
  );
};

export default KitchenMeal;
