import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import * as Yup from 'yup';

import useAuth from 'auth/useAuth';
import http from 'services/http';
import FormikField from 'components/common/FormikField';
import { Form, Formik, FormikHelpers } from 'formik';

import './style.css';
import { Box } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Obligatori')
    .email('Introdueix un correu valid')
    .min(0, ''),
  password: Yup.string().required('Obligatori').min(0, ''),
});

const initialValues: FormValues = {
  email: '',
  password: '',
};

export default function LoginScreen() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { login, user } = useAuth();

  const handleSubmit = async (
    { email, password }: FormValues,
    { setFieldValue }: FormikHelpers<FormValues>
  ) => {
    try {
      const { data, headers } = await http.post('/user/login', {
        email,
        password,
      });

      const refreshToken = headers['x-refresh-token'];
      login(data, refreshToken);
    } catch (ex) {
      if (ex.response.status === 400) {
        setOpen(true);
        setFieldValue('password', '');
      }
    }
  };

  if (user) return <Redirect to="/socis" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sessió
        </Typography>
        <Collapse in={open}>
          <Alert
            severity="error"
            className="alert"
            action={
              <Button
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Tancar
              </Button>
            }
          >
            Les dades introduïdes no son valides
          </Alert>
        </Collapse>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty }) => (
            <Form className="form" noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormikField
                    variant="outlined"
                    label="Email"
                    name="email"
                    required
                  />
                </Grid>
                <Grid item xs>
                  <FormikField
                    variant="outlined"
                    required
                    name="password"
                    label="Contrasenya"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!dirty || !isValid}
                  >
                    Iniciar Sessió
                  </Button>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Has oblidat la contrasenya?
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
