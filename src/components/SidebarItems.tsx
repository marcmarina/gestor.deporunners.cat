import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { NavLink } from 'react-router-dom';

import { Divider } from '@material-ui/core';
import LogoutNavButton from './common/LogoutNavButton';

import './sidebar.css';

export default function MainListItems() {
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
      <ListItem button>
        <ListItemIcon>
          <AccountCircleRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Usuaris" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EventRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <SettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Preferències" />
      </ListItem>
      <LogoutNavButton />
    </div>
  );
}
