import { Checkbox } from '@chakra-ui/react';
import { Field, useFormikContext } from 'formik';

const CustomCheckBox = ({ checkBox_text, isEditMode }) => {
  const { values, setFieldValue } = useFormikContext();
  
  return (
    <>
      <Field type="checkbox" name="everyDay">
        {({ field }) => (
          <Checkbox
            colorScheme="purple"
            isDisabled={values.reccuring ? false : true}
            isChecked={values.everyDay ? true : false}
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
