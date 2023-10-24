import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from '@chakra-ui/react';

const MealStepper = ({ steps, activeStep }) => {

  return (
    <Stepper
      size="lg"
      colorScheme="purple"
      index={activeStep}
      mb="25px"
      mr="22px"
      ml="14px"
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default MealStepper;
