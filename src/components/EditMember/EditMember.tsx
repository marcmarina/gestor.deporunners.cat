import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Paper } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import FormikField from 'components/common/FormikField';

import { updateById } from 'services/member';
import { Member } from 'interfaces/Member';

import './style.css';
import FormikSelect from 'components/common/FormikSelect';
import Town from 'interfaces/Town';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import { http } from 'services';

type TParams = {
  id: string;
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

export default function EditMember() {
  const { id } = useParams<TParams>();
  const { push } = useHistory();

  const queryClient = useQueryClient();

  const {
    data: member,
    isLoading: memberLoading,
    error: memberError,
  } = useQuery('member', async () => (await http.get(`/member/${id}`)).data);

  const {
    data: towns,
    isLoading: townsLoading,
    error: townsError,
  } = useQuery('towns', async () => (await http.get(`/town`)).data);

  if (townsLoading || memberLoading) return null;

  if (memberError) throw memberError;
  if (townsError) throw townsError;

  const handleSubmit = async (values: Member) => {
    try {
      const res = await updateById(values);
      if (res?.status === 200) push(`/socis/${member?._id}`);
      queryClient.invalidateQueries(['member', 'members']);
    } catch (ex) {
      console.log(ex);
    }
  };

  const initialValues: Member = { ...member };
  const selectTownItems = towns.map((town: Town) => {
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
        {({ isValid }) => (
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
                <FormikField
                  variant="outlined"
                  label="IBAN"
                  name="iban"
                  required
                />
              </Grid>
              <ButtonGrid className="button_grid" item xs={12}>
                <Button
                  disabled={!isValid}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Desar
                </Button>
              </ButtonGrid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

const ButtonGrid = styled(Grid)`
  .button_grid {
    display: flex;
    flex-direction: row-reverse;
  }
`;
