import React, { Dispatch, SetStateAction } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import { DateTimePicker } from '@material-ui/pickers';
import * as Yup from 'yup';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import FormikField from 'components/common/FormikField';
import http from 'services/http';

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
  setOpen: Dispatch<SetStateAction<boolean>>;
  onFinishSubmit: () => void;
}

export default function NewEvent({ open, setOpen, onFinishSubmit }: Props) {
  const handleSubmit = async (values: FormValues) => {
    try {
      const { status } = await http.post('/event', values);
      if (status === 201) {
        setOpen(false);
        onFinishSubmit();
      }
    } catch (ex) {
      console.log(ex.response.error);
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Nou Event</DialogTitle>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ values, setFieldValue }) => (
          <Form noValidate>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <FormikField
                    label="Nom"
                    name="name"
                    required
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={6}>
                  <DateTimePicker
                    autoOk
                    ampm={false}
                    disablePast
                    value={values['dateTime']}
                    onChange={date => setFieldValue('dateTime', date)}
                    label="Dia i hora"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={12}>
                  <FormikField
                    label="Descripció"
                    name="description"
                    required
                    type="text"
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormikField
                    label="Coordenades"
                    name="coordinates"
                    required
                    type="text"
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={() => setOpen(false)}>
                Tancar
              </Button>
              <Button type="submit" color="primary">
                Crear
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
