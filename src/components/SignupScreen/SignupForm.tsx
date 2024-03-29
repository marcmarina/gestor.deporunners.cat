import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { CardElement } from '@stripe/react-stripe-js';
import { Form, Formik } from 'formik';

import Town from 'interfaces/Town';
import TShirtSize from 'interfaces/TShirtSize';
import FormikField from 'components/common/FormikField';
import FormikSelect from 'components/common/FormikSelect';
import http from 'services/http';
import { useQuery } from 'react-query';

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
  onSubmit: (values: any) => void;
}

export default function SignupForm({ onSubmit }: Props) {
  const [stripeComplete, setStripeComplete] = useState(false);

  const { data: towns, isLoading: townsLoading } = useQuery(
    'towns',
    async () => (await http.get('/town')).data
  );

  const { data: tshirtSizes, isLoading: tshirtSizesLoading } = useQuery(
    'tshirtSizes',
    async () => (await http.get('/tshirtSize')).data
  );

  if (townsLoading || tshirtSizesLoading) return null;

  const selectTownItems = towns.map((town: Town) => {
    return { label: town.name, value: town._id };
  });
  const selectTshirtSizes = tshirtSizes.map((size: TShirtSize) => {
    return { label: size.name, value: size._id };
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => {
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
                    onChange={(event) => setStripeComplete(event.complete)}
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
                  disabled={!stripeComplete || isSubmitting}
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
