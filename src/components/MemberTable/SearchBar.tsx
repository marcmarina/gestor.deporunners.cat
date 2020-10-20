import React, { ChangeEvent } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {
  createStyles,
  fade,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

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

interface Props {
  value?: string;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  reset: () => void;
}

export default function SearchBar({ value, onChange, reset }: Props) {
  const classes = useStyles();

  return (
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
          value={value ? value : ''}
          onChange={onChange}
        />
      </div>
      <div className={classes.clearIcon}>
        <IconButton size="small" onClick={reset}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
