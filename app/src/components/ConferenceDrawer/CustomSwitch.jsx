import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { Field } from 'formik';

const CustomSwitch = ({
  setSwitchIsChecked,
  switch_text,
  formData,
  isEditMode,
}) => {
  return (
    <>
      <Field name="repeatReservation">
        {({ field }) => (
          <FormControl display="flex" alignItems="center">
            <Switch
              {...field}
              colorScheme="purple"
              isChecked={isEditMode ? formData.repeatReservation : field.value}
              onChange={(event) => {
                const { checked } = event.target;
                setSwitchIsChecked(checked);
                field.onChange(event);
              }}
            />
            <FormLabel htmlFor="reservation" mb="0" ml={3}>
              {switch_text}
            </FormLabel>
          </FormControl>
        )}
      </Field>
    </>
  );
};

export default CustomSwitch;
