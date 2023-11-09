import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

const CustomSwitch = ({ switch_text, isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <>
      <Field name="repeatReservation">
        {({ field }) => (
          <FormControl display="flex" alignItems="center">
            <Switch
              {...field}
              colorScheme="purple"
              isChecked={
                values.reccuring ? true : false
              }
              onChange={() => {
                const checked = values.reccuring;
                setFieldValue('reccuring', !checked);
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
