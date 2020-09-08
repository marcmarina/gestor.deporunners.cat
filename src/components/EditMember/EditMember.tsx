import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';

import { useParams } from 'react-router-dom';
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
  const handleTownChange = (e: any) => {
    setTown(e.target.value);
  };
  const [member, setMember] = useState<Member>();
  const [towns, setTowns] = useState<any>([]);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [dni, setDni] = useState();
  const [numMember, setNumMember] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [town, setTown] = useState();
  const [postCode, setPostCode] = useState();

  const { id } = useParams<TParams>();

  const retrieveMember = async (id: string) => {
    try {
      const { data } = await fetchById(id);

      setTown(data.address.town);
      setFirstName(data.firstName);
      setEmail(data.email);
      setDni(data.dni);
      setNumMember(data.numMember);
      setLastName(data.lastName);
      setStreetAddress(data.address.streetAddress);
      setPostCode(data.address.postCode);

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

  const handleSubmit = async () => {
    //
  };

  useEffect(() => {
    retrieveTowns();
    retrieveMember(id);
  }, []);

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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nom"
            value={firstName}
            fullWidth
            onChange={(e: any) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Cognoms"
            fullWidth
            value={lastName}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
          <TextField
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
          <TextField
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
          <TextField
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
            <Select
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
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Desar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

/*
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
*/
