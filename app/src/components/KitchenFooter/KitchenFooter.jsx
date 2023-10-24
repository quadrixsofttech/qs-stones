import { Flex, Button, Spacer, Checkbox } from '@chakra-ui/react';
import styles from './KitchenFooter.styles';

const KitchenFooter = ({ activeStep, setActiveStep }) => {

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <Flex {...styles.flexFooter}>
      <Checkbox {...styles.cbxFooter}>Bread</Checkbox>
      <Spacer />
      <Button
        {...styles.btnFooter}
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
        {activeStep >= 2 ? "Submit" : "Next"}
      </Button>
    </Flex>
  );
};

export default KitchenFooter;
