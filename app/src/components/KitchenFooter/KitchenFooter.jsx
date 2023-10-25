import { Flex, Button, Spacer, Checkbox } from '@chakra-ui/react';
import styles from './KitchenFooter.styles';

const KitchenFooter = ({ activeStep, setActiveStep, bread, setBread }) => {
  const handleBack = () => {
    window.localStorage.setItem('step', activeStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    window.localStorage.setItem('step', activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleChange = () => {
    setBread(!bread);
    window.localStorage.setItem('bread', !bread);
  };

  return (
    <Flex {...styles.flexFooter}>
      {activeStep == 0 && (
        <Checkbox {...styles.cbxFooter} onChange={handleChange}>
          Bread
        </Checkbox>
      )}
      <Spacer />
      <Button
        {...styles.btnFooter}
        variant="outline"
        isDisabled={activeStep === 0}
        onClick={handleBack}
      >
        Back
      </Button>
      <Button
        {...styles.btnFooter}
        isDisabled={activeStep === 3}
        onClick={handleNext}
      >
        {activeStep >= 2 ? 'Confirm' : 'Next'}
      </Button>
    </Flex>
  );
};

export default KitchenFooter;
