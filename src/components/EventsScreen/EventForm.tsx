import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { DateTimePicker } from '@material-ui/pickers';
import * as Yup from 'yup';
import FormikField from 'components/common/FormikField';
import http from 'services/http';
import Event from 'interfaces/Event';
import dayjs from 'dayjs';
import { coordinateValidator } from 'utils';
import { useMutation, useQueryClient } from 'react-query';

interface FormValues {
  name: string;
  description: string;
  dateTime?: Date;
  coordinates: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Obligatori').min(5, 'Minim 5 caracters'),
  description: Yup.string().required('Obligatori').min(5, 'Minim 5 caracters'),
  dateTime: Yup.date()
    .required('Obligatori')
    .test('future', 'La data ha de ser al futur', function (v) {
      if (v) {
        return new Date() < v;
      }
      return false;
    }),
  coordinates: Yup.string()
    .required('Obligatori')
    .test('valid', 'Les coordenades no son valides', coordinateValidator),
});

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  event?: Event;
}

export default function EventForm({ open, setOpen, event }: Props) {
  const isEdit = !!event;
  const queryClient = useQueryClient();

  const eventMutation = useMutation((values: any) =>
    isEdit ? http.put('/event', values) : http.post('/event', values)
  );

  const handleSubmit = async (values: FormValues) => {
    try {
      const { status } = await eventMutation.mutateAsync(values);

      if (status === 201) {
        setOpen(false);
        queryClient.invalidateQueries('events');
      }
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const initialValues: FormValues = event ?? {
    name: '',
    description: '',
    coordinates: '',
    dateTime: dayjs().add(1, 'hours').toDate(),
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        {isEdit ? 'Editar Event' : 'Nou Event'}
      </DialogTitle>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
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
                    value={values.dateTime}
                    onChange={(date) => setFieldValue('dateTime', date)}
                    label="Dia i hora"
                    fullWidth
                    required
                    error={touched.dateTime && errors.dateTime ? true : false}
                    helperText={touched.dateTime && errors.dateTime}
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
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isEdit ? 'Desar' : 'Crear'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
