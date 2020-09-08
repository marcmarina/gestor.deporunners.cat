import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { padStart } from 'lodash';
import { Paper } from '@material-ui/core';

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
  } = member;

  const fullAddress = `${address.streetAddress}, ${address.postCode}`;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <h1>
        {fullName} - {padStart(numMember.toString(), 3, '0')}
      </h1>
      <Paper className="member-info-container">
        <TextWithLabel label="Nom Complet" text={fullName} />
        <TextWithLabel label="DNI" text={dni} />
        <TextWithLabel label="Email" text={email} />
        <TextWithLabel label="Telefon" text={telephone} />
        <TextWithLabel label="Adreça" text={fullAddress} />
      </Paper>
    </div>
  );
}
