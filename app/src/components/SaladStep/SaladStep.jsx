import KitchenOverview from '../../components/KitchenOverview';

const SaladStep = ({
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectedSalad,
  setLclSelectedSalad,
}) => {
  return (
    <>
      <KitchenOverview
        type={'salad'}
        lclSelectedMeal={lclSelectedMeal}
        setLclSelectedMeal={setLclSelectedMeal}
        lclSelectedSalad={lclSelectedSalad}
        setLclSelectedSalad={setLclSelectedSalad}
      />
    </>
  );
};

export default SaladStep;
