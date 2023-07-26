import { Checkbox } from '@chakra-ui/react';
import { Field } from 'formik';

const CustomCheckBox = ({
  switchIsChecked,
  handleEveryDayCheck,
  checkBox_text,
}) => {
  return (
    <>
      <Field name="everyDay">
        {({ field }) => (
          <Checkbox
            colorScheme="purple"
            isDisabled={switchIsChecked ? false : true}
            isChecked={field.value}
            onChange={() => {
              const { checked } = field;
              handleEveryDayCheck();
              field.onChange(!checked);
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
