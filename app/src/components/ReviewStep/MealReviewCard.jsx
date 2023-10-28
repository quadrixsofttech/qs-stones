import { Box, Flex, Heading, Image, Text, Icon } from '@chakra-ui/react';
import styles from './ReviewStep.styles';
import { GiMeal } from 'react-icons/gi';

const MealReviewCard = ({ meal, bread }) => {
  return (
    <Flex {...styles.mealCard}>
      <Box overflow={'hidden'} sx={{ aspectRatio: '16/6' }}>
        <Image {...styles.mealImage} src={meal.image} />
      </Box>
      <Flex {...styles.mealInfo}>
        <Flex flexDir={'column'} gap="2">
          <Flex>
            <Heading {...styles.modalHeading}>
              <Icon as={GiMeal} mr="2" />
            </Heading>
            <Heading {...styles.heading}>{meal.name}</Heading>
          </Flex>
          <Box {...styles.typeInfo}>
            Type:{' '}
            <Text as="span" fontWeight={'600'}>
              {meal.type}
            </Text>
            <Flex {...styles.mealInfoBox}>
              <Text fontSize={'md'} color="black">
                Ingredients:
              </Text>
              <Text {...styles.mealInfoBold}> {meal.ingridients} </Text>
              <Text fontSize={'md'} color="black">
                Description:
              </Text>
              <Text {...styles.mealInfoBold}> {meal.desc} </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {meal.type === 'main dish' ? (
        bread ? (
          <Text {...styles.breadText}>With bread</Text>
        ) : (
          <Text {...styles.breadText}>Without bread</Text>
        )
      ) : null}
    </Flex>
  );
};

export default MealReviewCard;
