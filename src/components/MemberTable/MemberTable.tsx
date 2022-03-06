import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableFooter, TablePagination } from '@material-ui/core';

import MemberRow from './MemberRow';
import SearchBar from './SearchBar';

import { paginate } from 'utils/paginate';

import './style.css';

import { Member } from 'interfaces/Member';
import { connect } from 'react-redux';
import { fetchMembers } from 'redux/members/memberActions';
import fileDownload from 'js-file-download';
import http from 'services/http';

interface MemberTableState {
  searchFilter?: string;
  page: number;
  dialogOpen: boolean;
}

class MemberTable extends Component<any, MemberTableState> {
  state = {
    searchFilter: '',
    page: 0,
    dialogOpen: false,
  };

  componentDidMount = () => {
    this.props.dispatch(fetchMembers());
  };

  handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      searchFilter: event.target.value.toString(),
      page: 0,
    });
  };

  handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    this.setState({ page: page });
  };

  searchMembers = (members: Member[]) => {
    const filteredMembers = [...members];
    if (this.state.searchFilter) {
      return filteredMembers.filter((member) => {
        const fullName = member.firstName + ' ' + member.lastName;
        if (
          fullName.toLowerCase().includes(this.state.searchFilter.toLowerCase())
        ) {
          return member;
        } else {
          return null;
        }
      });
    }
    return filteredMembers;
  };

  getExcelFile = async () => {
    const res = await http.get('/member/excel', {
      responseType: 'blob',
    });
    fileDownload(res.data, 'Socis.xlsx');
  };

  render() {
    const { searchFilter, page } = this.state;
    const { members } = this.props;

    if (members && members.length === 0) return null;

    const rowsPerPage = 10;
    const filteredMembers = this.searchMembers(members);

    return (
      <>
        <SearchBar
          value={searchFilter}
          onChange={this.handleSearch}
          reset={() => this.setState({ searchFilter: undefined })}
        />
        <Button onClick={this.getExcelFile} color="primary">
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
                  onChangePage={this.handlePageChange}
                  rowsPerPage={rowsPerPage}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginate(filteredMembers, page + 1, rowsPerPage).map(
                (row: Member) => (
                  <MemberRow key={row._id} member={row} onDelete={() => {}} />
                )
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={filteredMembers.length}
                  page={page}
                  onChangePage={this.handlePageChange}
                  rowsPerPage={rowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    );
  }
}

function mapState(state) {
  return {
    members: state.member.items,
    error: state.member.error,
    loading: state.emloading,
  };
}

export default connect(mapState)(MemberTable);
