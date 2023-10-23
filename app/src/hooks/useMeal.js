import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const useMeal = () => {
  const [data, setData] = useState();

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

  return {
    meals: data,
    mealLoading,
    mealError,
  };
};

export default useMeal;