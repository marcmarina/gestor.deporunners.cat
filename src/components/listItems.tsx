import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';

import './sidebar.css';
import { Divider } from '@material-ui/core';

export const mainListItems = (
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
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
