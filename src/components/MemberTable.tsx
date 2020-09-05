import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  IconButton,
  ButtonGroup,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { padStart } from 'lodash';

import { fetchMembers } from '../services/member';
import { paginate } from '../utils/paginate';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();
  const [members, setMembers] = useState<any>([]);
  const [page, setPage] = useState(0);

  const retrieveData = async () => {
    try {
      const fetchedMembers = await fetchMembers();
      if (fetchedMembers.data) setMembers(fetchedMembers.data);
      console.log(fetchedMembers.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const { push } = useHistory();
  useEffect(() => {
    retrieveData();
  }, []);

  if (members.length === 0) return null;

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const rowsPerPage = 10;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom Complet</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Num. Soci</TableCell>
            <TableCell align="left">DNI</TableCell>
            <TableCell align="left">Telefon</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginate(members, page + 1, rowsPerPage).map((row: any) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                {padStart(row.numMember.toString(), 3, '0')}
              </TableCell>
              <TableCell align="left">{row.dni}</TableCell>
              <TableCell align="left">{row.telephone}</TableCell>
              <TableCell align="right">
                <ButtonGroup
                  color="primary"
                  variant="outlined"
                  aria-label="text primary button group"
                  style={{ backgroundColor: '#F5F5F5', borderRadius: '100px' }}
                >
                  <IconButton
                    style={{ color: 'green' }}
                    onClick={() => push(`/socis/${row._id}`)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton style={{ color: 'orange' }}>
                    <Edit />
                  </IconButton>
                  <IconButton style={{ color: 'tomato' }}>
                    <Delete />
                  </IconButton>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              count={members.length}
              page={page}
              onChangePage={handlePageChange}
              rowsPerPage={rowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
