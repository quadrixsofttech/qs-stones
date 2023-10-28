import KitchenOverview from '../../components/KitchenOverview';

const SaladStep = ({
  lclSelectedSalad,
  setLclSelectedSalad,
}) => {
  return (
    <>
      <KitchenOverview
        type={'salad'}
        lclSelectedMeal={lclSelectedSalad}
        setLclSelectedMeal={setLclSelectedSalad}
      />
    </>
  );
};

export default SaladStep;
