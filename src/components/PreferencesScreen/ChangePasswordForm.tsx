import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import FormikField from 'components/common/FormikField';
import { Button, Grid, Typography } from '@material-ui/core';
import http from 'services/http';
import { useAuthContext } from 'auth';

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Obligatori').min(4, 'Minim 4 caracters'),
  newPassword: Yup.string().required('Obligatori').min(4, 'Minim 4 caracters'),
  confirmNewPassword: Yup.string()
    .required('Obligatori')
    .test('equal', 'Les contrasenyes no coincideixen', function (v) {
      const ref = Yup.ref('newPassword');
      return v === this.resolve(ref);
    }),
});

export default function ChangePasswordForm() {
  const { user } = useAuthContext();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await http.patch(`/user/changePassword/${user?._id}`, values);
      resetForm();
    } catch (ex) {
      resetForm();
      console.log(ex.response);
    }
  };
  return (
    <div style={{ padding: 15 }}>
      <Typography variant="h6" style={{ marginBottom: 10 }}>
        Canviar Contrasenya
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => (
          <Form noValidate>
            <Grid container spacing={3}>
              <Grid item sm={12} xs={12}>
                <FormikField
                  label="Contrasenya Actual"
                  name="oldPassword"
                  required
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormikField
                  label="Nova Contrasenya"
                  name="newPassword"
                  required
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormikField
                  label="Confirmar"
                  name="confirmNewPassword"
                  required
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!dirty || !isValid}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Desar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}
