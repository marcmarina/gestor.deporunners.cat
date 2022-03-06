import React, { ReactNode } from 'react';
import { Field, ErrorMessage, FieldInputProps } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export interface FormikSelectItem {
  label: string;
  value: string;
}

interface FormikSelectProps {
  name: string;
  items: FormikSelectItem[];
  label: string;
  required?: boolean;
  variant?: string;
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  errorString?: string;
  children: ReactNode;
  label: string;
  required: boolean;
  variant: 'filled' | 'outlined' | 'standard';
}

function MaterialUISelectField({
  errorString,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
  variant,
}: MaterialUISelectFieldProps) {
  return (
    <FormControl fullWidth variant={variant}>
      <InputLabel htmlFor={name} required={required}>
        {label}
      </InputLabel>
      <Select
        label={label}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        value={value}
      >
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  );
}

export default function FormikSelect({
  name,
  items,
  label,
  required = false,
  variant = 'standard',
}: FormikSelectProps) {
  return (
    <Field
      name={name}
      as={MaterialUISelectField}
      label={label}
      errorString={<ErrorMessage name={name} />}
      required={required}
      variant={variant}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Field>
  );
}
