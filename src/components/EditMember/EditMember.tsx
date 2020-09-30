import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import FormikField from 'components/common/FormikField';

import { fetchById, updateById } from 'services/member';
import { Member } from 'interfaces/Member';

import './style.css';
import http from 'services/http';
import FormikSelect from 'components/common/FormikSelect';

type TParams = {
  id: string;
};

export default function EditMember() {
  const [member, setMember] = useState<Member>();
  const [towns, setTowns] = useState<any[]>();
  const [tshirtsizes, setTshirtsizes] = useState<any[]>();

  const { id } = useParams<TParams>();
  const { push, replace } = useHistory();

  const retrieveMember = useCallback(async () => {
    try {
      const { data } = await fetchById(id);
      if (data) setMember(data);
      else replace('/socis');
    } catch (ex) {
      replace('/socis');
      console.log(ex);
    }
  }, [id, replace]);

  const retrieveTowns = async () => {
    try {
      const { data } = await http.get('/town');
      setTowns(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const retireveTshirtSizes = async () => {
    try {
      const { data } = await http.get('/tshirtsize');
      setTshirtsizes(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveTowns();
    retrieveMember();
    retireveTshirtSizes();
  }, [id, retrieveMember]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Obligatori')
      .min(3, 'El nom ha de tenir minim 3 caracters'),
    lastName: Yup.string()
      .required('Obligatori')
      .min(3, 'El nom ha de tenir minim 3 caracters'),
    email: Yup.string().email().required('Obligatori'),
    dni: Yup.string().min(4).required('Obligatori'),
    numMember: Yup.number().required(''),
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

  const handleSubmit = async (values: Member) => {
    try {
      const res = await updateById(values);
      if (res?.status === 200) push(`/socis/${member?._id}`);
    } catch (ex) {
      console.log(ex);
    }
  };

  if (!member || !towns || !tshirtsizes) return null;

  const initialValues: Member = { ...member };
  const selectTownItems = towns.map((town: any) => {
    return { label: town.name, value: town._id };
  });
  const selectTShirtItems = tshirtsizes.map((tshirtSize: any) => {
    return { label: tshirtSize.name, value: tshirtSize._id };
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
          <Form noValidate>
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
              <Grid item xs={12} sm={6}>
                <FormikField
                  variant="outlined"
                  label="Adreça"
                  name="address.streetAddress"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormikSelect
                  variant="outlined"
                  label="Ciutat"
                  name="address.town._id"
                  items={selectTownItems}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormikField
                  variant="outlined"
                  label="Codi Postal"
                  name="address.postCode"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  variant="outlined"
                  label="Telefon"
                  name="telephone"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikSelect
                  variant="outlined"
                  label="Talla Samarreta"
                  name="tshirtSize._id"
                  items={selectTShirtItems}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikField
                  variant="outlined"
                  label="IBAN"
                  name="iban"
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
