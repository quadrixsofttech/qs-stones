import MainDishStep from '../MainDishStep';
import SaladStep from '../SaladStep';
import ReviewStep from '../ReviewStep';

const StepByStep = ({
  activeStep,
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectSalad,
  setLclSelectSalad,
  date,
  bread,
}) => {
  return (
    <>
      {activeStep == 0 ? (
        <MainDishStep
          lclSelectedMeal={lclSelectedMeal}
          setLclSelectedMeal={setLclSelectedMeal}
        />
      ) : activeStep == 1 ? (
        <SaladStep
          lclSelectedSalad={lclSelectSalad}
          setLclSelectedSalad={setLclSelectSalad}
        />
      ) : (
        <ReviewStep meal={lclSelectedMeal} salad={lclSelectSalad} date={date} bread={bread} />
      )}
    </>
  );
};

export default StepByStep;
