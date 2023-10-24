import { Flex, Grid, GridItem, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './KitchenOverview.styles';
import KitchenMeal from './KitchenMeal';
import useMeal from '../../hooks/useMeal';

const KitchenOverview = () => {

  const { meals, mealLoading } = useMeal();

  if (mealLoading || !meals) {
    return <Spinner />;
  }

  console.log(meals)

  return (
    <Flex flexDir={'column'} position={'relative'}>
      <Flex justifyContent={'flex-end'} mt="4">
      </Flex>
      <Grid {...styles.mealGrid}>
        {meals.map((meal) => {
          return (
            <GridItem key={meal.id}>
              <KitchenMeal
                key={meal.id}
                id={meal.id}
                name={meal.name}
                img={meal.image}
                type={meal.type}
                ingredients={meal.ingridients}
                desc={meal.desc}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default KitchenOverview;
