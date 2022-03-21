import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { Box, Form, FormField, Button } from 'grommet';

import { useAuthContext } from 'auth/AuthContext';
import http from 'services/http';

import './style.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Obligatori')
    .email('Introdueix un correu valid')
    .min(0, ''),
  password: Yup.string().required('Obligatori').min(0, ''),
});

export default function LoginScreen() {
  const { login, user } = useAuthContext();

  if (user) return <Redirect to="/socis" />;

  const handleSubmit = async (values, { setFieldValue }) => {
    try {
      const { data: authToken, headers } = await http.post('/user/login', {
        email: values.email,
        password: values.password,
      });

      const refreshToken = headers['x-refresh-token'];
      login({ authToken, refreshToken });
    } catch (ex) {
      setFieldValue('password', '');
    }
  };

  return (
    <Box pad="medium">
      <Box
        width="medium"
        alignSelf="center"
        direction="column"
        align="center"
        pad="medium"
      >
        <Formik
          enableReinitialize
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            dirty,
            isSubmitting,
            isValid,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Box>
              <h1>Login</h1>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Field
                  as={FormField}
                  name="email"
                  placeholder="Email"
                  required={true}
                  error={touched.email && errors.email}
                />
                <Field
                  as={FormField}
                  name="password"
                  type="password"
                  placeholder="Password"
                  error={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  primary
                  label="Submit"
                  disabled={!dirty || isSubmitting || !isValid}
                />
              </Form>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
