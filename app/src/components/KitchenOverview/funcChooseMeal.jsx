const chooseMeal = (
  meal,
  isSelected,
  setLclSelectedMeal,
  isSelectedSalad,
  setLclSelectedSalad
) => {
  console.log(meal);
  if (isSelected) {
    setLclSelectedMeal('');
    window.localStorage.removeItem('meal');
  } else if (isSelectedSalad) {
    setLclSelectedSalad('');
    window.localStorage.removeItem('salad');
  } else {
    if (meal.type === 'main dish') {
      setLclSelectedMeal(meal);
      window.localStorage.setItem('meal', JSON.stringify(meal));
    } else {
      setLclSelectedSalad(meal);
      window.localStorage.setItem('salad', JSON.stringify(meal));
    }
  }
};

export default chooseMeal;
