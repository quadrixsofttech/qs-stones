import { Checkbox } from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

const CustomCheckBox = ({ checkBox_text, formData, isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <>
      <Field type="checkbox" name="everyDay">
        {({ field }) => (
          <Checkbox
            colorScheme="purple"
            isDisabled={values.repeatReservation ? false : true}
            isChecked={isEditMode ? formData.everyDay : values.everyDay}
            onChange={() => {
              const checked = values.everyDay;
              setFieldValue('everyDay', !checked);
            }}
          >
            {checkBox_text}
          </Checkbox>
        )}
      </Field>
    </>
  );
};

export default CustomCheckBox;
