import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { padStart } from 'lodash';
import { Button, ButtonGroup } from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';

import LinkWithComponent from 'components/common/LinkWithComponent';

import { Member } from 'interfaces/Member';
import { useAuthContext } from 'auth';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { http } from 'services';
import { useMutation } from 'react-query';

interface Props {
  member: Member;
  onDelete: () => void;
}

export default function MemberRow({ member, onDelete }: Props) {
  const { user } = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteMember = useMutation(() => http.delete(`/member/${member._id}`), {
    onSuccess: () => {
      onDelete();
      setDialogOpen(false);
    },
  });

  return (
    <>
      <TableRow key={member._id} className="table__row">
        <TableCell align="left">
          {padStart(member.numMember.toString(), 3, '0')}
        </TableCell>
        <TableCell component="th" scope="row">
          {member.firstName} {member.lastName}
        </TableCell>
        <TableCell align="left">{member.email}</TableCell>
        <TableCell align="left">{member.dni}</TableCell>
        <TableCell align="left">{member.telephone}</TableCell>
        <TableCell align="right">
          <ButtonGroup
            color="primary"
            variant="outlined"
            aria-label="text primary button group"
            size="small"
          >
            <Button className="IconButton ViewButton">
              <LinkWithComponent to={`/socis/${member._id}`}>
                <Visibility />
              </LinkWithComponent>
            </Button>
            <Button className="IconButton EditButton">
              <LinkWithComponent to={`/socis/edit/${member._id}`}>
                <Edit />
              </LinkWithComponent>
            </Button>
            {user?.role.name === 'Admin' && (
              <Button
                className="IconButton DeleteButton"
                onClick={() => setDialogOpen(true)}
              >
                <Delete />
              </Button>
            )}
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        text="Segur que vols eliminar aquest soci? Aquesta acció es irreversible."
        title="Confirmar Operació"
        open={dialogOpen}
        handleYes={deleteMember.mutate}
        handleNo={() => setDialogOpen(false)}
      />
    </>
  );
}
