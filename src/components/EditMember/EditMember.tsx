import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import FormikField from '../common/FormikField';

import { fetchById } from '../../services/member';

import './style.css';
import http from '../../services/http';
import FormikSelect from '../common/FormikSelect';

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
      .required('')
      .min(3, 'El nom ha de tenir minim 3 caracters'),
    lastName: Yup.string()
      .required('')
      .min(3, 'El nom ha de tenir minim 3 caracters'),
    email: Yup.string().email().required(''),
    town: Yup.string().required(''),
    dni: Yup.string().min(4).required(''),
    numMember: Yup.number().required(''),
    streetAddress: Yup.string().required(''),
    postCode: Yup.string().required(''),
  });

  const handleSubmit = async (values: Member) => {
    alert(JSON.stringify(values));
  };

  if (!member || !towns) return null;

  const initialValues: Member = { ...member };
  const selectItems = towns.map((town: any) => {
    return { label: town.name, value: town._id };
  });

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
                <FormikField
                  variant="outlined"
                  label="Nom"
                  name="firstName"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  variant="outlined"
                  label="Cognoms"
                  name="lastName"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  variant="outlined"
                  label="Email"
                  name="email"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormikField
                  variant="outlined"
                  label="DNI"
                  name="dni"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormikField
                  variant="outlined"
                  label="Número Soci"
                  name="numMember"
                  required
                  type="number"
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
                  name="address.town"
                  items={selectItems}
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
              <Grid className="button_grid" item xs={12}>
                <Button
                  disabled={!isValid}
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
    </Paper>
  );
}
