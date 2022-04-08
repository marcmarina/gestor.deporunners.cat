import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { padStart } from 'lodash';
import { Button, Grid, Paper } from '@material-ui/core';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import TextWithLabel from 'components/common/TextWithLabel';

import './style.css';
import ConfirmDialog from 'components/common/ConfirmDialog';
import LinkWithComponent from 'components/common/LinkWithComponent';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { http } from 'services';

type TParams = {
  id: string;
};

export default function SingleMember() {
  const { id } = useParams<TParams>();
  const { replace } = useHistory();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: member,
    isLoading,
    error,
  } = useQuery('member', async () => (await http.get(`/member/${id}`)).data);

  const deleteMember = useMutation(() => http.delete(`/member/${member._id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('members');
      replace('/socis');
    },
  });

  const handleDelete = () => {
    setDialogOpen(true);
  };

  if (error) console.log(error);

  if (isLoading) return null;

  const {
    _id,
    dni,
    email,
    firstName,
    lastName,
    telephone,
    numMember,
    address,
    iban,
    tshirtSize,
  } = member;

  const fullAddress = `${address.streetAddress}, ${address.postCode}, ${address.town.name}`;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="member-info-container">
      <div className="heading">
        <h1 className="header">
          {fullName} - {padStart(numMember.toString(), 3, '0')}
        </h1>
        <div className="button-container">
          <LinkWithComponent to={`/socis/edit/${_id}`}>
            <Button variant="contained" className="button edit">
              <EditOutlined />
              Editar
            </Button>
          </LinkWithComponent>
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
              variant="text"
              textVariant="h6"
              label="Nom Complet"
              text={fullName}
            />
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="DNI"
              text={dni}
            />
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="Email"
              text={email}
            />
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="Telefon"
              text={telephone}
            />
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="Adreça"
              text={fullAddress}
            />
          </Grid>
          <Grid item xs>
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="Talla Samarreta"
              text={tshirtSize.name}
            />
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="Número Soci"
              text={padStart(numMember.toString(), 3, '0')}
            />
            <TextWithLabel
              variant="text"
              textVariant="h6"
              label="IBAN"
              text={iban ? iban : 'No definit'}
            />
          </Grid>
        </Grid>
      </Paper>
      <ConfirmDialog
        text="Segur que vols eliminar aquest soci? Aquesta acció es irreversible."
        title="Confirmar Operació"
        open={dialogOpen}
        handleYes={deleteMember.mutate}
        handleNo={() => setDialogOpen(false)}
      />
    </div>
  );
}
