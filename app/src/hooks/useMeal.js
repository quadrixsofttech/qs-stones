import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useMeal = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getMeals = async () => {
    const { data } = await axios.get('/api/v1/kitchen');
    return data;
  };

  const { isLoading: mealLoading, error: mealError } = useQuery(
    'Meals',
    getMeals,
    {
      onSuccess: (data) => setData(data),
    }
  );

  const createMealOrder = async (mealData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/v1/kitchen', mealData);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    meals: data,
    mealLoading,
    mealError,
    createMealOrder,
    isLoading
  };
};

export default useMeal;
