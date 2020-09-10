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
import { ExitToAppOutlined } from '@material-ui/icons';

import useAuth from '../auth/useAuth';

import './sidebar.css';

export default function MainListItems() {
  const { logout } = useAuth();
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
      <ListItem button onClick={() => logout()}>
        <ListItemIcon>
          <ExitToAppOutlined style={{ color: '#F44336' }} />
        </ListItemIcon>
        <ListItemText primary="Tancar Sessió" style={{ color: '#F44336' }} />
      </ListItem>
    </div>
  );
}
