import { Checkbox } from '@chakra-ui/react';
import { Field } from 'formik';

const CustomCheckBox = ({
  switchIsChecked,
  handleEveryDayCheck,
  checkBox_text,
}) => {
  return (
    <>
      <Field type="checkbox" name="everyDay">
        {({ field }) => (
          <Checkbox
            colorScheme="purple"
            isDisabled={switchIsChecked ? false : true}
            isChecked={field.value}
            onChange={(e) => {
              const { checked } = e.target;
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
