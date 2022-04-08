import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableFooter, TablePagination } from '@material-ui/core';
import { useQuery, useQueryClient } from 'react-query';

import MemberRow from './MemberRow';
import SearchBar from './SearchBar';

import { paginate } from 'utils';

import './style.css';

import { Member } from 'interfaces/Member';
import fileDownload from 'js-file-download';
import { http } from 'services';

export default function MemberTable() {
  const [searchFilter, setSearchFilter] = useState<string | undefined>();
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data: members, isLoading: loadingMembers } = useQuery(
    'members',
    async () => (await http.get('/member')).data
  );

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchFilter(event.target.value.toString());
    setPage(0);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    setPage(page);
  };

  const searchMembers = (members: Member[]) => {
    if (searchFilter) {
      return members.filter((member) => {
        const fullName = member.firstName + ' ' + member.lastName;
        if (fullName.toLowerCase().includes(searchFilter.toLowerCase())) {
          return member;
        } else {
          return null;
        }
      });
    }
    return members;
  };

  const getExcelFile = async () => {
    const res = await http.get('/member/excel', {
      responseType: 'blob',
    });
    fileDownload(res.data, 'Socis.xlsx');
  };

  if (loadingMembers) return null;

  const rowsPerPage = 10;
  const filteredMembers = searchMembers(members);

  return (
    <>
      <SearchBar
        value={searchFilter}
        onChange={handleSearch}
        reset={() => setSearchFilter(undefined)}
      />
      <Button onClick={getExcelFile} color="primary">
        Descarregar Excel
      </Button>
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
                  onDelete={() => queryClient.invalidateQueries('members')}
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
    </>
  );
}
