import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormData from 'form-data';
import getObject from 'lodash/get';

import FormikField from 'components/common/FormikField';
import http from 'services/http';
import Clothing from 'interfaces/Clothing';
import TShirtSize from 'interfaces/TShirtSize';

interface FormValues {
  name?: string;
  ref?: string;
  price?: number | '';
  image?: File | null;
  sizes: string[];
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Obligatori').min(5, 'Minim 5 caracters'),
  ref: Yup.string().required('Obligatori').min(5, 'Minim 5 caracters'),
  image: Yup.mixed().test('fileType', 'Unsupported File Format', value => {
    if (value)
      return (
        value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
      );
    else return true;
  }),
  price: Yup.number(),
});

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  clothing?: Clothing;
  onFinishSubmit: () => void;
}

export default function ClothingForm({
  open,
  setOpen,
  clothing,
  onFinishSubmit,
}: Props) {
  const [sizes, setSizes] = useState<TShirtSize[]>();

  const handleSubmit = async (values: FormValues) => {
    const cloth = {
      _id: clothing?._id,
      name: values.name,
      ref: values.ref,
      sizes: values.sizes,
      price: values.price,
    };

    try {
      const res = clothing
        ? await http.put('/clothing', cloth)
        : await http.post('/clothing', cloth);
      if (res.status === 201) {
        if (values.image) {
          const data = new FormData();
          data.append('image', values.image);
          await http.put(
            `/clothing/${res.data._id || clothing?._id}/image`,
            data,
            {
              headers: {
                'Content-Type': `multipart/form-data`,
              },
            }
          );
        }
        setOpen(false);
        onFinishSubmit();
      }
    } catch (ex) {
      console.log(ex.response);
    }
  };

  let initialValues: FormValues = {
    name: '',
    price: '',
    image: null,
    ref: '',
    sizes: [],
  };

  if (clothing) {
    initialValues = {
      ...clothing,
      sizes: clothing.sizes.map(i => i._id),
      image: null,
    };
  }

  const retrieveSizes = async () => {
    try {
      const res = await http.get('/tshirtsize');
      setSizes(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveSizes();
  }, []);

  if (!sizes) return null;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        {clothing ? 'Editar Producte' : 'Nou Producte'}
      </DialogTitle>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ values, setFieldValue, errors, touched, dirty, isValid }) => (
          <Form noValidate>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <FormikField
                    label="Nom"
                    name="name"
                    required
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormikField
                    label="Referència"
                    name="ref"
                    required
                    type="text"
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormikField
                    label="Preu"
                    name="price"
                    required
                    type="number"
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={6}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    style={{ height: '100%' }}
                    color="primary"
                  >
                    Penjar Foto
                    <input
                      id="file"
                      name="file"
                      type="file"
                      hidden
                      onChange={event => {
                        if (event.currentTarget.files)
                          setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                  </Button>
                </Grid>
                <Grid item sm={12}>
                  {sizes.map(size => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={getObject(values, 'sizes').includes(
                            size._id
                          )}
                          onChange={() => {
                            if (values.sizes.includes(size._id)) {
                              setFieldValue(
                                'sizes',
                                values.sizes.filter(i => i !== size._id)
                              );
                            } else {
                              setFieldValue('sizes', [
                                ...values.sizes,
                                size._id,
                              ]);
                            }
                          }}
                        />
                      }
                      label={size.name}
                    />
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={() => setOpen(false)}>
                Tancar
              </Button>
              <Button
                // disabled={!dirty || !isValid}
                type="submit"
                color="primary"
              >
                {clothing ? 'Desar' : 'Crear'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
