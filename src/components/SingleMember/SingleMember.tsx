import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { padStart } from 'lodash';
import { Paper } from '@material-ui/core';

import TextWithLabel from '../common/TextWithLabel';

import { fetchById } from '../../services/member';

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
}

export default function SingleMember() {
  const [member, setMember] = useState<Member>();

  const { id } = useParams<TParams>();

  const retrieveData = async (id: string) => {
    try {
      const { data } = await fetchById(id);
      console.log(data);
      setMember(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveData(id);
  }, []);

  if (!member) return null;

  return (
    <div>
      <h1>
        {member.firstName} {member.lastName} -{' '}
        {padStart(member.numMember.toString(), 3, '0')}
      </h1>
      <Paper style={{ padding: 10 }}>
        <TextWithLabel
          label="Nom Complet"
          text={`${member.firstName} ${member.lastName}`}
        />
        <TextWithLabel label="DNI" text={member.dni} />
        <TextWithLabel label="Email" text={member.email} />
        <TextWithLabel label="Telefon" text={member.telephone} />
      </Paper>
    </div>
  );
}
