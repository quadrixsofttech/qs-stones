import MainDishStep from '../MainDishStep';
import SaladStep from '../SaladStep';
import ReviewStep from '../ReviewStep';

const StepByStep = ({
  activeStep,
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectSalad,
  setLclSelectSalad,
}) => {
  return (
    <div>
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
        <ReviewStep />
      )}
    </div>
  );
};

export default StepByStep;
