import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { addLogEntry } from '../services/logs';
import InputField from './InputField';

type AddLogEntryFormProps = {
  location: {
    latitude: number;
    longitude: number;
  };
  onClose: Function;
};

const AddLogEntryForm: React.FC<AddLogEntryFormProps> = ({
  location: { latitude, longitude },
  onClose,
}) => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        comments: '',
        rating: '',
        visitDate: '',
      }}
      onSubmit={async (values, action) => {
        console.log(values, action);
        try {
          onClose();
        } catch (err) {}
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name='title' label='Title' />
          <InputField name='description' textarea label='Description' />
          <InputField name='comments' label='Comments' />
          <InputField type='number' name='rating' label='rating' />
          <InputField type='date' name='visitDate' label='Visit Date' />
          <button type='submit' disabled={isSubmitting}>
            Add Log
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddLogEntryForm;
