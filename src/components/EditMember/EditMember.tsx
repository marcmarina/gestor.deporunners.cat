import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchById } from '../../services/member';
import axios from 'axios';

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
  const handleChange = (e: any) => {
    setTown(e.target.value);
  };

  const [member, setMember] = useState<Member>();
  const [towns, setTowns] = useState<any>([]);

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const [town, setTown] = useState('');

  const { id } = useParams<TParams>();

  const retrieveMember = async (id: string) => {
    try {
      const { data } = await fetchById(id);
      setMember(data);
      setTown(data.address.town);
    } catch (ex) {
      console.log(ex);
    }
  };

  const retrieveTowns = async () => {
    try {
      const { data } = await axios.get('/api/town');
      setTowns(data);
    } catch (ex) {
      console.log(ex);
    }
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
            value={member.firstName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Cognoms"
            fullWidth
            value={member.lastName}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            value={member.address.streetAddress}
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ciutat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
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
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
