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

import { useAuthContext } from 'auth';
import http from 'services/http';
import FormikField from 'components/common/FormikField';
import { Form, Formik, FormikHelpers } from 'formik';

import './style.css';
import { Box } from '@material-ui/core';
import { useQueryString } from 'hooks';
import { useMutation } from 'react-query';
import axios from 'axios';

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

const useStyles = makeStyles((theme) => ({
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
  const { nextPage } = useQueryString();

  const { login, user } = useAuthContext();

  const loginMutation = useMutation((values: FormValues) =>
    http.post('/user/login', values)
  );

  const handleSubmit = async (
    { email, password }: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await loginMutation.mutateAsync({
        email,
        password,
      });

      login(data);
    } catch (ex) {
      if (axios.isAxiosError(ex) && ex?.response?.status === 401) {
        setOpen(true);
        resetForm({
          values: { email, password: '' },
        });
      }
    }
  };

  if (user) return <Redirect to={nextPage ?? '/'} />;

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
                    focused
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
