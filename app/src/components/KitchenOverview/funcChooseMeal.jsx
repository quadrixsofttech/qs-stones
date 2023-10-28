const chooseMeal = (
  meal,
  isSelected,
  setLclSelectedMeal
) => {
  if (isSelected) {
    setLclSelectedMeal('');
    window.localStorage.removeItem(meal.type === 'main dish'?'meal': 'salad');
  } else {
      setLclSelectedMeal(meal);
      window.localStorage.setItem(meal.type === 'main dish'?'meal': 'salad', JSON.stringify(meal));
  }
};

export default chooseMeal;
