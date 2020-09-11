import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { padStart } from 'lodash';
import { Button, Grid, Paper } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import TextWithLabel from 'components/common/TextWithLabel';

import { deleteById, fetchById } from 'services/member';
import { Member } from 'interfaces/Member';

import './style.css';
import ConfirmDialog from 'components/common/ConfirmDialog';

type TParams = {
  id: string;
};

export default function SingleMember() {
  const [member, setMember] = useState<Member>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { id } = useParams<TParams>();

  const { replace, push } = useHistory();

  const handleEdit = () => {
    push(`/socis/edit/${id}`);
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const deleteMember = async () => {
    try {
      const { status } = await deleteById(id);
      if (status === 200) {
        replace('/socis');
      } else {
        alert("No s'ha pogut eliminar el soci");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

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

  useEffect(() => {
    retrieveMember();
  }, [id, retrieveMember]);

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
      <ConfirmDialog
        text="Segur que vols eliminar aquest soci? Aquesta acció es irreversible."
        title="Confirmar Operació"
        open={dialogOpen}
        handleYes={deleteMember}
        handleNo={() => setDialogOpen(false)}
      />
    </div>
  );
}
