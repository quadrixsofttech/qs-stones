import KitchenOverview from '../../components/KitchenOverview';

const MainDishStep = ({
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectedSalad,
  setLclSelectedSalad,
}) => {
  return (
    <div>
      <KitchenOverview
        type={'main dish'}
        lclSelectedMeal={lclSelectedMeal}
        setLclSelectedMeal={setLclSelectedMeal}
        lclSelectedSalad={lclSelectedSalad}
        setLclSelectedSalad={setLclSelectedSalad}
      />
    </div>
  );
};

export default MainDishStep;
