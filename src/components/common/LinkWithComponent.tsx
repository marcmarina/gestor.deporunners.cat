import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
}

const useStyles = makeStyles({
  link: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
    '&:active': {
      color: 'inherit',
    },
    '&:visited': {
      color: 'inherit',
    },
  },
});

export default function LinkWithComponent({ children, to }: Props) {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.link}>
      {children}
    </Link>
  );
}
