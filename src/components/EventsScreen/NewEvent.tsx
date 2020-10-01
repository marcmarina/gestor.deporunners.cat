import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { DateTimePicker } from '@material-ui/pickers';
import * as Yup from 'yup';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface FormValues {
  name: string;
  description: string;
  dateTime?: MaterialUiPickersDate;
  coordinates: string;
}

const initialValues: FormValues = {
  name: '',
  description: '',
  coordinates: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Obligatori').min(5, 'Minim 5 caracters'),
  description: Yup.string().required('Obligatori').min(5, 'Minim 5 caracters'),
  dateTime: Yup.date().required('Obligatori'),
  coordinates: Yup.string().required('Obligatori'),
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function NewEvent({ open, handleClose }: Props) {
  const handleSubmit = () => {
    //
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <DateTimePicker
                autoOk
                ampm={false}
                disablePast
                value={values['dateTime']}
                onChange={date => setFieldValue('dateTime', date)}
                label="Dia i hora"
                fullWidth
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Tancar
        </Button>
        <Button color="primary">Crear</Button>
      </DialogActions>
    </Dialog>
  );
}
