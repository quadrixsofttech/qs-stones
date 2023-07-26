import { Input, Text, Textarea } from '@chakra-ui/react';
import { ErrorMessage, Field } from 'formik';
import GenerateMarkerColor from './GenerateMarkerColor/GenerateMarkerColor';

const CardInfo = () => {
  return (
    <>
      <Text fontSize="md" mb={1} fontWeight={'400'}>
        Title
      </Text>
      <Field name="title">
        {({ field }) => (
          <Input {...field} placeholder="Please enter a title..." />
        )}
      </Field>
      <ErrorMessage name="title" component="div" className="error" />

      <Text fontSize="md" mb={1} fontWeight={'400'} mt={3}>
        Description
      </Text>
      <Field name="description">
        {({ field }) => (
          <Textarea
            {...field}
            placeholder="Please enter a description..."
            h={'20'}
          />
        )}
      </Field>
      <ErrorMessage name="description" component="div" className="error" />
      <Text mt={3} fontSize="md">
        Choose marker color
      </Text>
      <Field name="markerColor" component={GenerateMarkerColor} />
      <ErrorMessage name="markerColor" component="div" className="error" />
    </>
  );
};

export default CardInfo;
