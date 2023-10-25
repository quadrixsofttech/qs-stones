import KitchenOverview from '../../components/KitchenOverview';

const SaladStep = ({
  lclSelectedMeal,
  setLclSelectedMeal,
  lclSelectedSalad,
  setLclSelectedSalad,
}) => {
  return (
    <div>
      <KitchenOverview
        type={'salad'}
        lclSelectedMeal={lclSelectedMeal}
        setLclSelectedMeal={setLclSelectedMeal}
        lclSelectedSalad={lclSelectedSalad}
        setLclSelectedSalad={setLclSelectedSalad}
      />
    </div>
  );
};

export default SaladStep;
