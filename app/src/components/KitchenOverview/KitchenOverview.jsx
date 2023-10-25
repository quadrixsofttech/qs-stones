import { Flex, Grid, GridItem, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './KitchenOverview.styles';
import KitchenMeal from './KitchenMeal';
import useMeal from '../../hooks/useMeal';

const KitchenOverview = ({ type, lclSelectedMeal, setLclSelectedMeal, lclSelectedSalad, setLclSelectedSalad }) => {
  const { meals, mealLoading } = useMeal();

  if (mealLoading || !meals) {
    return <Spinner />;
  }

  const filteredMeals = meals.filter((meal) => meal.type === type);

  return (
    <Flex flexDir={'column'} position={'relative'}>
      <Flex justifyContent={'flex-end'} mt="4"></Flex>
      <Grid {...styles.mealGrid}>
        {filteredMeals.map((meal) => {
          return (
            <GridItem key={meal._id}>
              <KitchenMeal
                meal={meal}
                isSelected={
                  !!lclSelectedMeal &&
                  lclSelectedMeal?._id?.toString() === meal?._id?.toString()
                }
                setLclSelectedMeal={setLclSelectedMeal}
                isSelectedSalad={
                  !!lclSelectedSalad &&
                  lclSelectedSalad?._id?.toString() === meal?._id?.toString()
                }
                setLclSelectedSalad={setLclSelectedSalad}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default KitchenOverview;
