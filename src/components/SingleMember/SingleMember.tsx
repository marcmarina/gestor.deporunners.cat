import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { padStart } from 'lodash';
import { Grid, Paper } from '@material-ui/core';

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
  };
}

export default function SingleMember() {
  const [member, setMember] = useState<Member>();

  const { id } = useParams<TParams>();

  const retrieveData = async (id: string) => {
    try {
      const { data } = await fetchById(id);
      setMember(data);
    } catch (ex) {
      console.log(ex);
    }
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

  const fullAddress = `${address.streetAddress}, ${address.postCode}`;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <h1>
        {fullName} - {padStart(numMember.toString(), 3, '0')}
      </h1>
      <Paper className="member-info-container">
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
