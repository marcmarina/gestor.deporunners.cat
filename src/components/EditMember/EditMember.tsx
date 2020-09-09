import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import FormikField from '../common/FormikField';

import { fetchById } from '../../services/member';

import './style.css';
import http from '../../services/http';

type TParams = {
  id: string;
};

interface Member {
  firstName: string;
  lastName: string;
  numMember: number;
  email: string;
  dni: string;
  telephone: string;
  address: {
    postCode: string;
    streetAddress: string;
    town: string;
  };
}

export default function EditMember() {
  const [member, setMember] = useState<Member>();
  const [towns, setTowns] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    position: '',
  });

  const { id } = useParams<TParams>();

  const retrieveMember = async (id: string) => {
    try {
      const { data } = await fetchById(id);
      setMember(data);
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
    retrieveMember(id);
  }, [id]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'El nom ha de tenir minim 3 caracters')
      .required(''),
    lastName: Yup.string().min(3).required(''),
    email: Yup.string().email().required(''),
    town: Yup.string().required(''),
    dni: Yup.string().min(4).required(''),
    numMember: Yup.number().required(''),
    streetAddress: Yup.string().required(''),
    postCode: Yup.string().required(''),
  });

  interface FormValues {
    name: string;
    position: string;
  }

  const handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values));
  };

  if (!member || !towns) return null;

  return (
    <Paper
      style={{
        padding: 30,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Editar Soci
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormikField label="Nom" name="firstName" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField label="Cognoms" name="lastName" required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField label="Email" name="email" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormikField label="DNI" name="dni" required />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormikField
                  label="Número Soci"
                  name="numMember"
                  required
                  type="number"
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {/* <Form
          initialValues={{}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Grid item xs={12} sm={6}>
            <Field
              as={TextField}
              required
              id="firstName"
              name="firstName"
              label="Nom"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              as={TextField}
              required
              id="lastName"
              name="lastName"
              label="Cognoms"
              fullWidth
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
              autoComplete="family-name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              as={TextField}
              required
              id="email"
              name="email"
              label="Email"
              value={email}
              fullWidth
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Field
              as={TextField}
              required
              id="dni"
              name="dni"
              label="DNI"
              value={dni}
              fullWidth
              onChange={(e: any) => setDni(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Field
              as={TextField}
              required
              id="numMember"
              name="numMember"
              label="Numero de Soci"
              value={numMember}
              fullWidth
              onChange={(e: any) => setNumMember(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              required
              id="address1"
              name="address1"
              label="Adreça"
              fullWidth
              value={streetAddress}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ciutat</InputLabel>
              <Field
                as={Select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleTownChange}
                value={town}
              >
                {towns &&
                  towns.map((town: any) => (
                    <MenuItem key={town._id} value={town._id}>
                      {town.name}
                    </MenuItem>
                  ))}
              </Field>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              as={TextField}
              required
              id="zip"
              name="zip"
              label="Codi Postal"
              value={postCode}
              onChange={(e: any) => setPostCode(e.target.value)}
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid className="button_grid" item xs={12}>
            <Button type="submit" color="primary" variant="outlined">
              Desar
            </Button>
          </Grid>
        </Form> */}
    </Paper>
  );
}
