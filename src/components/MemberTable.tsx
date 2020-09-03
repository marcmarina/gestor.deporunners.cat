import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchMembers } from '../services/member';
import { Button, TablePagination } from '@material-ui/core';

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

  useEffect(() => {
    retrieveData();
  }, []);

  if (members.length === 0) return null;

  return (
    <TableContainer
      component={Paper}
      style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom Complet</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Num. Soci</TableCell>
            <TableCell align="left">DNI</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((row: any) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.numMember}</TableCell>
              <TableCell align="left">{row.dni}</TableCell>
              {/* <TableCell align="right">
                <Button type="submit" variant="contained" color="primary">
                  Misc. Actions
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        labelRowsPerPage="Files per pagina"
        count={members.length}
        page={0}
        onChangePage={() => console.log('Page change')}
        rowsPerPage={10}
        style={{
          justifyItems: 'center',
          // backgroundColor: 'dodgerblue',
          width: '100%',
          margin: '10',
        }}
      />
    </TableContainer>
  );
}
