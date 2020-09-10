import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableFooter,
  TablePagination,
} from '@material-ui/core';

import MemberRow from './MemberRow';

import { deleteById, fetchMembers } from '../../services/member';
import { paginate } from '../../utils/paginate';
import { useHistory } from 'react-router-dom';

import './style.css';

import { Member } from '../../interfaces/Member';

export default function SimpleTable() {
  const [members, setMembers] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [memberId, setMemberId] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const retrieveData = async () => {
    try {
      const fetchedMembers = await fetchMembers();
      if (fetchedMembers.data) setMembers(fetchedMembers.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleView = (id: string) => {
    push(`/socis/${id}`);
  };

  const handleEdit = (id: string) => {
    push(`/socis/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setDialogOpen(true);
    setMemberId(id);
  };

  const deleteMember = async () => {
    try {
      if (memberId) {
        const res = await deleteById(memberId);
        if (res.status === 200) {
          setMembers(members.filter((item: any) => item._id !== memberId));
          setMemberId(undefined);
          setDialogOpen(false);
        }
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
    <>
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
            {paginate(members, page + 1, rowsPerPage).map((row: Member) => (
              <MemberRow
                key={row._id}
                member={row}
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
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
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirmar operació'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Segur que vols eliminar aquest soci? Aquesta acció es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={deleteMember} color="primary" autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
