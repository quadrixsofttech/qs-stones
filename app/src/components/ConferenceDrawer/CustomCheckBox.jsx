import { Checkbox } from '@chakra-ui/react';
import { Field } from 'formik';

const CustomCheckBox = ({
  switchIsChecked,
  handleEveryDayCheck,
  checkBox_text,
  formData,
  isEditMode,
}) => {
  return (
    <>
      <Field type="checkbox" name="everyDay">
        {({ field }) => (
          <Checkbox
            colorScheme="purple"
            isDisabled={switchIsChecked ? false : true}
            isChecked={isEditMode ? formData.everyDay : field.value}
            onChange={() => {
              const { checked } = field;
              handleEveryDayCheck();
              field.onChange({ target: { name: field.name, value: !checked } });
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
