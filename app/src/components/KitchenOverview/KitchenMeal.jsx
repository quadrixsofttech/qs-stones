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
import { Button } from '@chakra-ui/react';
import KitchenMealModal from './KitchenMealModal';
import { GiMeal } from 'react-icons/gi';
import chooseMeal from './funcChooseMeal';

const KitchenMeal = ({
  meal,
  isSelected,
  setLclSelectedMeal,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, image, type } = meal;

  return (
    <Flex
      {...styles.mealCard}
      borderColor={isSelected ? '#48BB78' : 'white'}
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
          colorScheme={isSelected ? 'green' : 'purple'}
          {...styles.buttonChooseMeal}
          onClick={() =>
            chooseMeal(
              meal,
              isSelected,
              setLclSelectedMeal,
            )
          }
        >
          {isSelected ? 'Selected' : 'Choose meal'}
        </Button>
      </Flex>
      <KitchenMealModal
        isOpen={isOpen}
        onClose={onClose}
        isSelected={isSelected}
        setLclSelectedMeal={setLclSelectedMeal}
        meal={meal}
      />
    </Flex>
  );
};

export default KitchenMeal;
