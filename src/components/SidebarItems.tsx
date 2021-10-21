import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { NavLink } from 'react-router-dom';

import LogoutNavButton from './LogoutNavButton';

import './sidebar.css';
import useAuth from 'auth/useAuth';

export default function MainListItems() {
  const { user } = useAuth();
  return (
    <div>
      <NavLink to="/socis" className="navbarLink">
        <ListItem button>
          <ListItemIcon>
            <PeopleAltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Socis" />
        </ListItem>
      </NavLink>
      {user?.role.name === 'Admin' && (
        <ListItem button>
          <ListItemIcon>
            <AccountCircleRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Usuaris" />
        </ListItem>
      )}
      <NavLink to="/events" className="navbarLink">
        <ListItem button>
          <ListItemIcon>
            <EventRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
      </NavLink>
      <LogoutNavButton />
    </div>
  );
}
