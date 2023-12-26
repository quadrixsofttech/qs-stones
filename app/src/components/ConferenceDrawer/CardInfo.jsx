import { Input, Text, Textarea } from '@chakra-ui/react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import GenerateMarkerColor from './GenerateMarkerColor/GenerateMarkerColor';

const CardInfo = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleTitleChange = (e) => {
    setFieldValue('title', e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setFieldValue('description', e.target.value);
  };

  return (
    <>
      <Text fontSize="md" mb={1} fontWeight={'400'}>
        Title
      </Text>
      <Field name="title">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Please enter a title..."
            value={values.title}
            onChange={handleTitleChange}
          />
        )}
      </Field>
      <ErrorMessage name="title" component="div" className="error" />
      <Text fontSize="md" mb={1} fontWeight={'400'} mt={3}>
        Description
      </Text>
      <Field name="title">
        {({ field }) => (
          <Textarea
            {...field}
            placeholder="Please enter a description..."
            h={'20'}
            value={values.description}
            onChange={handleDescriptionChange}
            resize="none"
          />
        )}
      </Field>
      <ErrorMessage name="description" component="div" className="error" />
      <Text mt={3} fontSize="md">
        Choose marker color
      </Text>
      <Field name="markerColor" component={GenerateMarkerColor} />
    </>
  );
};

export default CardInfo;
