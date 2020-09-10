import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { padStart } from 'lodash';
import { Button, ButtonGroup } from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';

import { Member } from '../../interfaces/Member';
import useAuth from '../../auth/useAuth';

interface Props {
  member: Member;
  handleDelete: (id: string) => void;
  handleView: (id: string) => void;
  handleEdit: (id: string) => void;
}

export default function MemberRow({
  member,
  handleDelete,
  handleEdit,
  handleView,
}: Props) {
  const { user } = useAuth();

  return (
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
          <Button
            className="IconButton ViewButton"
            onClick={() => handleView(member._id)}
          >
            <Visibility />
          </Button>
          <Button
            className="IconButton EditButton"
            onClick={() => handleEdit(member._id)}
          >
            <Edit />
          </Button>
          {user?.role.name === 'Admin' && (
            <Button
              className="IconButton DeleteButton"
              onClick={() => handleDelete(member._id)}
            >
              <Delete />
            </Button>
          )}
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}
