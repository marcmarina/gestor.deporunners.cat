import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Formik, FormikValues } from 'formik';

import Town from 'interfaces/Town';
import TShirtSize from 'interfaces/TShirtSize';
import FormikField from 'components/common/FormikField';
import FormikSelect from 'components/common/FormikSelect';
import http from 'services/http';

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
  creditCard: {},
  tshirtSize: '',
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
    postCode: Yup.string().required('Obligatori'),
    town: Yup.string().required('Obligatori'),
  }),
  telephone: Yup.string()
    .required('Obligatori')
    .min(9, 'El telefon ha de tenir minim 9 caracters'),
  iban: Yup.string().required('Obligatori'),
  tshirtSize: Yup.string().required('Obligatori'),
});

interface Props {
  onFinishSubmit: () => void;
}

export default function SignupForm({ onFinishSubmit }: Props) {
  const [towns, setTowns] = useState<Town[]>();
  const [tshirtSizes, setTshirtSizes] = useState<TShirtSize[]>();
  const [stripeComplete, setStripeComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values: FormikValues) => {
    try {
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (!card) {
        return;
      }

      const res = await http.post('/member', {
        ...values,
      });

      const getSecret = await http.get('/member/signup/secret');

      let result: any;

      try {
        result = await stripe.confirmCardPayment(getSecret.data.clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: `${res.data.firstName} ${res.data.lastName}`,
              email: res.data.email,
            },
          },
        });
      } catch (ex) {
        await http.delete(`/member/signup/failure/${res.data._id}`);
        throw ex;
      }

      if (result.error) {
        console.log(result.error.message);
        await http.delete(`/member/signup/failure/${res.data._id}`);
      } else {
        if (
          result.paymentIntent &&
          result.paymentIntent.status === 'succeeded'
        ) {
          await http.post(`/member/signup/success/${res.data._id}`);
          onFinishSubmit();
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

  const retrieveTshirtSizes = async () => {
    try {
      const { data } = await http.get('/tshirtSize');
      setTshirtSizes(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveTowns();
    retrieveTshirtSizes();
  }, []);

  if (!towns || !tshirtSizes) return null;
  const selectTownItems = towns.map((town: Town) => {
    return { label: town.name, value: town._id };
  });
  const selectTshirtSizes = tshirtSizes.map((size: TShirtSize) => {
    return { label: size.name, value: size._id };
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, isSubmitting }) => {
        return (
          <Form noValidate className="signup-form">
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={6}>
                <FormikField
                  variant="outlined"
                  label="Codi Postal"
                  name="address.postCode"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormikSelect
                  variant="outlined"
                  label="Talla Samarreta"
                  name="tshirtSize"
                  items={selectTshirtSizes}
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
              <Grid item xs={12} sm={9}>
                <div className="card-element">
                  <CardElement
                    onChange={event => setStripeComplete(event.complete)}
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
                  disabled={
                    !dirty || !isValid || isSubmitting || !stripeComplete
                  }
                >
                  Pagar
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}></Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
