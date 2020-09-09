import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextField from '@material-ui/core/TextField';

import './FormikField.css';

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

export default function FormikField({
  name,
  label,
  type = 'text',
  required = false,
}: FormikFieldProps) {
  return (
    <div className="FormikField">
      <Field
        required={required}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        fullWidth
        type={type}
        helperText={<ErrorMessage name={name} />}
      />
    </div>
  );
}
