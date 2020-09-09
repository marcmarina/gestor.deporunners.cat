import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  ButtonGroup,
  TableFooter,
  TablePagination,
  Button,
} from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { padStart } from 'lodash';

import { deleteById, fetchMembers } from '../../services/member';
import { paginate } from '../../utils/paginate';
import { useHistory } from 'react-router-dom';

import './style.css';

export default function SimpleTable() {
  const [members, setMembers] = useState<any>([]);
  const [page, setPage] = useState(0);

  const retrieveData = async () => {
    try {
      const fetchedMembers = await fetchMembers();
      if (fetchedMembers.data) setMembers(fetchedMembers.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteById(id);
      if (res.status === 200) {
        setMembers(members.filter((item: any) => item._id !== id));
      }
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
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Num. Soci</TableCell>
            <TableCell>Nom Complet</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">DNI</TableCell>
            <TableCell align="left">Telefon</TableCell>
            {/* <TableCell align="right"> */}
            <TablePagination
              rowsPerPageOptions={[]}
              count={members.length}
              page={page}
              onChangePage={handlePageChange}
              rowsPerPage={rowsPerPage}
            />
            {/* </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginate(members, page + 1, rowsPerPage).map((row: any) => (
            <TableRow key={row._id} className="table__row">
              <TableCell align="left">
                {padStart(row.numMember.toString(), 3, '0')}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.dni}</TableCell>
              <TableCell align="left">{row.telephone}</TableCell>
              <TableCell align="right">
                <ButtonGroup
                  color="primary"
                  variant="outlined"
                  aria-label="text primary button group"
                  size="small"
                >
                  <Button
                    className="IconButton ViewButton"
                    onClick={() => push(`/socis/${row._id}`)}
                  >
                    <Visibility />
                  </Button>
                  <Button
                    className="IconButton EditButton"
                    onClick={() => push(`/socis/edit/${row._id}`)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    className="IconButton DeleteButton"
                    onClick={() => handleDelete(row._id)}
                  >
                    <Delete />
                  </Button>
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
