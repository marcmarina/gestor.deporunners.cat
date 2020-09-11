import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  fade,
  IconButton,
  InputBase,
  makeStyles,
  TableFooter,
  TablePagination,
  Theme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import MemberRow from './MemberRow';

import { deleteById, fetchMembers } from '../../services/member';
import { paginate } from '../../utils/paginate';
import { useHistory } from 'react-router-dom';

import './style.css';

import { Member } from '../../interfaces/Member';
import ConfirmDialog from '../common/ConfirmDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade('#aaa', 0.15),
      '&:hover': {
        backgroundColor: fade('#aaa', 0.25),
      },
      marginRight: theme.spacing(2),
      marginBottom: 10,
      width: '25%',
      display: 'flex',
    },
    searchIcon: {
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      padding: '0px 10px',
    },
    searchBar: {
      flexGrow: 2,
    },
    clearIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    inputInput: {
      padding: '10px',
      width: '100%',
    },
  })
);

export default function SimpleTable() {
  const [members, setMembers] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [memberId, setMemberId] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>();

  const classes = useStyles();

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

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchFilter(event.target.value.toString());
    setPage(0);
  };

  const searchMembers = (members: Member[]) => {
    const filteredMembers = [...members];
    if (searchFilter) {
      return filteredMembers.filter(member => {
        const fullName = member.firstName + ' ' + member.lastName;
        if (fullName.toLowerCase().includes(searchFilter.toLowerCase())) {
          return member;
        } else {
          return null;
        }
      });
    }
    return filteredMembers;
  };

  const rowsPerPage = 10;
  const filteredMembers = searchMembers(members);

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <div className={classes.searchBar}>
          <InputBase
            placeholder="Cercar..."
            classes={{
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchFilter ? searchFilter : ''}
            onChange={handleSearch}
          />
        </div>
        <div className={classes.clearIcon}>
          <IconButton size="small" onClick={() => setSearchFilter(undefined)}>
            <ClearIcon />
          </IconButton>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Num. Soci</TableCell>
              <TableCell>Nom Complet</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">DNI</TableCell>
              <TableCell align="left">Telefon</TableCell>
              <TablePagination
                rowsPerPageOptions={[]}
                count={filteredMembers.length}
                page={page}
                onChangePage={handlePageChange}
                rowsPerPage={rowsPerPage}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginate(filteredMembers, page + 1, rowsPerPage).map(
              (row: Member) => (
                <MemberRow
                  key={row._id}
                  member={row}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={filteredMembers.length}
                page={page}
                onChangePage={handlePageChange}
                rowsPerPage={rowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
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
