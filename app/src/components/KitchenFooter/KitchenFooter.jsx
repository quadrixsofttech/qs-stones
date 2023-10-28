import { Flex, Button, Spacer, Checkbox, useToast } from '@chakra-ui/react';
import styles from './KitchenFooter.styles';

const KitchenFooter = ({
  activeStep,
  setActiveStep,
  bread,
  setBread,
  disabled,
  date,
}) => {
  const toast = useToast();
  const handleBack = () => {
    window.localStorage.setItem('step', activeStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    window.localStorage.setItem('step', activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep == 2) {
      toast({
        position: 'top-right',
        status: 'success',
        variant: 'subtle',
        duration: 3000,
        description: `You have successfully added dishes for the date ${date}`,
      });
    }
  };

  const handleChange = () => {
    setBread(!bread);
    window.localStorage.setItem('bread', !bread);
  };

  return (
    <Flex {...styles.flexFooter}>
      {activeStep == 0 && (
        <Checkbox
          {...styles.cbxFooter}
          onChange={handleChange}
          isChecked={bread}
        >
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
        isDisabled={disabled}
        onClick={handleNext}
      >
        {activeStep >= 2 ? 'Confirm' : 'Next'}
      </Button>
    </Flex>
  );
};

export default KitchenFooter;
