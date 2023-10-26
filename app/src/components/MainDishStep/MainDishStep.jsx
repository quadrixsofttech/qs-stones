import KitchenOverview from '../../components/KitchenOverview';

const MainDishStep = ({
  lclSelectedMeal,
  setLclSelectedMeal,
}) => {
  return (
    <>
      <KitchenOverview
        type={'main dish'}
        lclSelectedMeal={lclSelectedMeal}
        setLclSelectedMeal={setLclSelectedMeal}
      />
    </>
  );
};

export default MainDishStep;
