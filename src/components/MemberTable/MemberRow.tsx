import { Button, ButtonGroup } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import useRoles from 'auth/useRoles';
import ConfirmDialog from 'components/common/ConfirmDialog';
import LinkWithComponent from 'components/common/LinkWithComponent';
import { Member } from 'interfaces/Member';
import { padStart } from 'lodash';
import React, { useState } from 'react';
import { deleteById } from 'services/member';

interface Props {
  member: Member;
  onDelete: () => void;
}

export default function MemberRow({ member, onDelete }: Props) {
  const { hasRole } = useRoles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteMember = async () => {
    try {
      const res = await deleteById(member._id);
      if (res.status === 200) {
        setDialogOpen(false);
        onDelete();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

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
            {hasRole('Administrator') && (
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
        handleYes={deleteMember}
        handleNo={() => setDialogOpen(false)}
      />
    </>
  );
}
