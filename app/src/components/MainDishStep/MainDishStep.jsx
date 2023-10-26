import KitchenOverview from '../../components/KitchenOverview';

const MainDishStep = ({
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectedSalad,
  setLclSelectedSalad,
}) => {
  return (
    <>
      <KitchenOverview
        type={'main dish'}
        lclSelectedMeal={lclSelectedMeal}
        setLclSelectedMeal={setLclSelectedMeal}
        lclSelectedSalad={lclSelectedSalad}
        setLclSelectedSalad={setLclSelectedSalad}
      />
    </>
  );
};

export default MainDishStep;
