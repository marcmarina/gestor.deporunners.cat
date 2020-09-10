import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { padStart } from 'lodash';
import { Button, Grid, Paper } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import TextWithLabel from '../common/TextWithLabel';

import { fetchById } from '../../services/member';

import './style.css';

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
  iban?: string;
  address: {
    postCode: string;
    streetAddress: string;
    town: {
      _id: string;
      name: string;
    };
  };
}

export default function SingleMember() {
  const [member, setMember] = useState<Member>();

  const { id } = useParams<TParams>();

  const { replace, push } = useHistory();

  const retrieveData = async (id: string) => {
    try {
      const { data } = await fetchById(id);
      if (data) setMember(data);
      else replace('/socis');
    } catch (ex) {
      replace('/socis');
      console.log(ex);
    }
  };

  const handleEdit = () => {
    push(`/socis/edit/${id}`);
  };

  const handleDelete = () => {
    // TO-DO
  };

  useEffect(() => {
    retrieveData(id);
  }, [id]);

  if (!member) return null;

  const {
    dni,
    email,
    firstName,
    lastName,
    telephone,
    numMember,
    address,
    iban,
  } = member;

  const fakeIban = 'ES12 1234 1234 1234 1234';

  const fullAddress = `${address.streetAddress}, ${address.postCode}, ${address.town.name}`;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="member-info-container">
      <div className="heading">
        <h1 className="header">
          {fullName} - {padStart(numMember.toString(), 3, '0')}
        </h1>
        <div className="button-container">
          <Button
            variant="contained"
            className="button edit"
            onClick={handleEdit}
          >
            <EditOutlined />
            Editar
          </Button>
          <Button
            variant="contained"
            className="button delete"
            onClick={handleDelete}
          >
            <DeleteOutline />
            Eliminar
          </Button>
        </div>
      </div>
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextWithLabel
              variant="outlined"
              label="Nom Complet"
              text={fullName}
            />
            <TextWithLabel variant="outlined" label="DNI" text={dni} />
            <TextWithLabel variant="outlined" label="Email" text={email} />
            <TextWithLabel
              variant="outlined"
              label="Telefon"
              text={telephone}
            />
            <TextWithLabel
              variant="outlined"
              label="Adreça"
              text={fullAddress}
            />
          </Grid>
          <Grid item xs>
            <TextWithLabel
              variant="outlined"
              label="Número Soci"
              text={padStart(numMember.toString(), 3, '0')}
            />
            <TextWithLabel
              variant="outlined"
              label="IBAN"
              text={iban ? iban : fakeIban}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
