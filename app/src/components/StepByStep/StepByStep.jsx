import MainDishStep from '../MainDishStep';
import SaladStep from '../SaladStep';
import ReviewStep from '../ReviewStep';

const StepByStep = ({
  activeStep,
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectSalad,
  setLclSelectSalad,
  meal,
  salad,
  date,
  bread,
}) => {
  return (
    <>
      {activeStep == 0 ? (
        <MainDishStep
          lclSelectedMeal={lclSelectedMeal}
          setLclSelectedMeal={setLclSelectedMeal}
          lclSelectedSalad={lclSelectSalad}
          setLclSelectedSalad={setLclSelectSalad}
        />
      ) : activeStep == 1 ? (
        <SaladStep
          lclSelectedMeal={lclSelectedMeal}
          setLclSelectedMeal={setLclSelectedMeal}
          lclSelectedSalad={lclSelectSalad}
          setLclSelectedSalad={setLclSelectSalad}
        />
      ) : (
        <ReviewStep meal={meal} salad={salad} date={date} bread={bread} />
      )}
    </>
  );
};

export default StepByStep;
