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

const KitchenMeal = ({ id, name, img, type, ingredients, desc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
  const gray400 = theme.colors.gray[400];

  return (
    <Flex {...styles.mealCard} onClick={onOpen}>
      <Box overflow={'hidden'} sx={{ aspectRatio: '16/6' }}>
        <Image {...styles.mealImage} src={img} />
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
        <Button {...styles.buttonChooseMeal} onClick={onOpen}>
          Choose meal
        </Button>
      </Flex>
      <KitchenMealModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        name={name}
        type={type}
        img={img}
        ingredients={ingredients}
        desc={desc}
      />
    </Flex>
  );
};

export default KitchenMeal;
