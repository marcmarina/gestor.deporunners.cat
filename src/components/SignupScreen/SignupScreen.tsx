import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import FormikField from 'components/common/FormikField';
import http from 'services/http';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Obligatori'),
  lastName: Yup.string().required('Obligatori'),
  email: Yup.string().required('Obligatori'),
});

export default function SignupScreen() {
  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values: FormikValues) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { data } = await http.get('/member/signup/secret');

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: `${values.firstName} ${values.lastName}`,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscripció
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty }) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    name="firstName"
                    variant="outlined"
                    required
                    label="Nom"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    name="lastName"
                    variant="outlined"
                    required
                    label="Cognoms"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormikField
                    name="email"
                    variant="outlined"
                    required
                    label="Email"
                  />
                </Grid>
              </Grid>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',

                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!dirty || !isValid}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
