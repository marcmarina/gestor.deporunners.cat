import React, { useEffect, useState } from 'react';
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
import Town from 'interfaces/Town';
import FormikSelect from 'components/common/FormikSelect';
import { useHistory } from 'react-router-dom';

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
}));

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  dni: '',
  address: {
    streetAddress: '',
    town: '',
    postCode: '',
  },
  telephone: '',
  iban: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Obligatori')
    .min(3, 'El nom ha de tenir minim 3 caracters'),
  lastName: Yup.string()
    .required('Obligatori')
    .min(3, 'El nom ha de tenir minim 3 caracters'),
  email: Yup.string().email().required('Obligatori'),
  dni: Yup.string().min(4).required('Obligatori'),
  address: Yup.object().shape({
    streetAddress: Yup.string()
      .required('Obligatori')
      .min(10, "L'adreça ha de tenir minim 10 caracters"),
    postCode: Yup.string().required(''),
    town: Yup.string().required(''),
  }),
  telephone: Yup.string()
    .required('')
    .min(9, 'El telefon ha de tenir minim 9 caracters'),
  iban: Yup.string().required(''),
});

export default function SignupScreen() {
  const [towns, setTowns] = useState<Town[]>();

  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const handleSubmit = async (values: FormikValues) => {
    try {
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (!card) {
        return;
      }

      const createMember = await http.post('/member', {
        ...values,
      });

      const getSecret = await http.get('/member/signup/secret');

      const result = await stripe.confirmCardPayment(
        getSecret.data.clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: `${values.firstName} ${values.lastName}`,
              email: values.email,
            },
          },
        }
      );

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (
          result.paymentIntent &&
          result.paymentIntent.status === 'succeeded'
        ) {
          http.post(`/member/signup/${createMember.data._id}/email`);
          history.push('/inscripcio');
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const retrieveTowns = async () => {
    try {
      const { data } = await http.get('/town');
      setTowns(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveTowns();
  }, []);

  if (!towns) return null;

  const selectTownItems = towns.map((town: Town) => {
    return { label: town.name, value: town._id };
  });

  return (
    <Container component="main" maxWidth="md">
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
          {({ isValid, dirty, isSubmitting }) => (
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
                <Grid item xs={12} sm={6}>
                  <FormikField
                    name="email"
                    variant="outlined"
                    required
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    variant="outlined"
                    label="DNI"
                    name="dni"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    variant="outlined"
                    label="Adreça"
                    name="address.streetAddress"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikSelect
                    variant="outlined"
                    label="Ciutat"
                    name="address.town._id"
                    items={selectTownItems}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormikField
                    variant="outlined"
                    label="Codi Postal"
                    name="address.postCode"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormikField
                    variant="outlined"
                    label="Telefon"
                    name="telephone"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormikField
                    variant="outlined"
                    label="IBAN"
                    name="iban"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={5}>
                  <div
                    style={{
                      padding: 8.5,
                      backgroundColor: '#f6f6f6',
                      borderRadius: 5,
                    }}
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#97A2AD',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    Realitzar inscripció
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
