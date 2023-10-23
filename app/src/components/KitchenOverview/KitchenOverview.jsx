import { Flex, Grid, GridItem, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './KitchenOverview.styles';
import KitchenMeal from './KitchenMeal';
import useMeal from '../../hooks/useMeal';

const KitchenOverview = () => {

  /*const { meals, mealLoading } = useMeal();

  if (mealLoading || !meals) {
    return <Spinner />;
  }*/

  const meals = 
  [
    {
      "name": "Spaghetti Carbonara",
      "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese", "Black Pepper"],
      "type": "Italian",
      "description": "A classic Roman pasta dish known for its creamy sauce.",
      "image": "https://media.istockphoto.com/id/943785646/photo/spaghetti-carbonara-with-garlic-bread.jpg?s=1024x1024&w=is&k=20&c=nW0ncFd0_iMR4AFWSdNkXF1q_GQZc8zoMSpzUPagUqg=",
      "createdAt": "2023-10-23T08:00:00Z",
      "updatedAt": "2023-10-23T08:00:00Z"
    },
    {
      "name": "Chicken Tikka Masala",
      "ingredients": ["Chicken", "Yogurt", "Tomato Sauce", "Spices"],
      "type": "Indian",
      "description": "A popular Indian dish with tender chicken in a creamy tomato sauce.",
      "image": "https://media.istockphoto.com/id/1130696007/photo/authentic-chicken-dhal-curry-on-a-bed-of-white-basmati-rice-with-a-green-rocket-salad.jpg?s=2048x2048&w=is&k=20&c=ZKJJ5FaNo8lzSnTdpYectZJkqJutQihSK9loOhBQZV8=",
      "createdAt": "2023-10-23T09:15:00Z",
      "updatedAt": "2023-10-23T09:15:00Z"
    },
    {
      "name": "Sushi Rolls",
      "ingredients": ["Rice", "Nori Seaweed", "Fish", "Vegetables", "Soy Sauce"],
      "type": "Japanese",
      "description": "Delicious rolls of vinegared rice with various fillings.",
      "image": "https://media.istockphoto.com/id/135849804/photo/sushi.jpg?s=2048x2048&w=is&k=20&c=MnvR4zVobM9zc19Ga5cvfX-1VqE2CUMdok7qBe6oJR4=",
      "createdAt": "2023-10-23T10:30:00Z",
      "updatedAt": "2023-10-23T10:30:00Z"
    },
    {
      "name": "Margarita Pizza",
      "ingredients": ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Basil"],
      "type": "Italian",
      "description": "A simple and classic Italian pizza with fresh basil and tomatoes.",
      "image": "https://media.istockphoto.com/id/1414575281/photo/a-delicious-and-tasty-italian-pizza-margherita-with-tomatoes-and-buffalo-mozzarella.jpg?s=2048x2048&w=is&k=20&c=VMgkDRJoTv5VLHO4C4SDis7bD4Oiy39SjnQRGDv56FA=",
      "createdAt": "2023-10-23T11:45:00Z",
      "updatedAt": "2023-10-23T11:45:00Z"
    },
    {
      "name": "Beef Stir-Fry",
      "ingredients": ["Beef", "Bell Peppers", "Broccoli", "Soy Sauce", "Ginger"],
      "type": "Chinese",
      "description": "A quick and delicious stir-fry with tender beef and fresh vegetables.",
      "image": "https://media.istockphoto.com/id/642065070/photo/beef-and-broccoli-stir-fry.jpg?s=2048x2048&w=is&k=20&c=dbDtSlwZV5wss933_Er-pbHya-Jqb19rOOu1VdKDq3U=",
      "createdAt": "2023-10-23T13:00:00Z",
      "updatedAt": "2023-10-23T13:00:00Z"
    },
    {
      "name": "Caesar Salad",
      "ingredients": ["Romaine Lettuce", "Croutons", "Parmesan Cheese", "Caesar Dressing"],
      "type": "Salad",
      "description": "A classic salad with a creamy Caesar dressing and crunchy croutons.",
      "image": "https://media.istockphoto.com/id/1337799015/photo/caesar-salad.jpg?s=2048x2048&w=is&k=20&c=ykdDU5Sv5XzZNYK7StjvwpCIjKevxTH4-ZAMYzSpe9g=",
      "createdAt": "2023-10-23T14:15:00Z",
      "updatedAt": "2023-10-23T14:15:00Z"
    },
    {
      "name": "Fish Tacos",
      "ingredients": ["Fish Fillets", "Tortillas", "Cabbage Slaw", "Salsa", "Lime"],
      "type": "Mexican",
      "description": "Tasty tacos with crispy fish and a zesty slaw.",
      "image": "https://media.istockphoto.com/id/171147729/photo/fish-tacos.jpg?s=2048x2048&w=is&k=20&c=aUGzElB3rJdgyIP3wbeJfQczD_j6pp8W7sS-WFKpjiQ=",
      "createdAt": "2023-10-23T15:30:00Z",
      "updatedAt": "2023-10-23T15:30:00Z"
    },
    {
      "name": "Vegetable Curry",
      "ingredients": ["Mixed Vegetables", "Coconut Milk", "Curry Paste", "Rice"],
      "type": "Indian",
      "description": "A flavorful and spicy vegetable curry served with rice.",
      "image": "https://media.istockphoto.com/id/1446953833/photo/indian-aloo-mutter-curry.jpg?s=2048x2048&w=is&k=20&c=1mWajMywEIoZjsPTrkdbBL0JItA_ZvJuAgVDwSfQT0c=",
      "createdAt": "2023-10-23T16:45:00Z",
      "updatedAt": "2023-10-23T16:45:00Z"
    },
    {
      "name": "Greek Salad",
      "ingredients": ["Cucumbers", "Tomatoes", "Olives", "Feta Cheese", "Oregano"],
      "type": "Salad",
      "description": "A fresh and healthy Greek salad with a tangy vinaigrette.",
      "image": "https://media.istockphoto.com/id/93466976/photo/greek-salad-served-by-the-water-in-santorini-greece.jpg?s=2048x2048&w=is&k=20&c=h91LtLLgnAdsBQCiP1rpoRrKz68gBUXCklv_zuRDph8=",
      "createdAt": "2023-10-23T18:00:00Z",
      "updatedAt": "2023-10-23T18:00:00Z"
    },
    {
      "name": "Beef Burger",
      "ingredients": ["Beef Patty", "Burger Bun", "Lettuce", "Tomato", "Cheese"],
      "type": "Burger",
      "description": "A classic beef burger with all the fixings.",
      "image": "https://media.istockphoto.com/id/1416033452/photo/cheeseburger-on-a-homemade-wooden-cutting-board-with-a-dark-background.jpg?s=2048x2048&w=is&k=20&c=ZvPhyIDLTxuqWgFZbmupiLvZTL39OKOGkY_f-C5KjB8=",
      "createdAt": "2023-10-23T19:15:00Z",
      "updatedAt": "2023-10-23T19:15:00Z"
    }
  ]

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
                ingredients={meal.ingredients}
                description={meal.description}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default KitchenOverview;
