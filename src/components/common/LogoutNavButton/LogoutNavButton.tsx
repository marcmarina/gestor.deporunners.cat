import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';

import useAuth from '../../../auth/useAuth';

export default function LogoutNavButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <>
      <ListItem button onClick={() => setDialogOpen(true)}>
        <ListItemIcon>
          <ExitToAppOutlined style={{ color: '#F44336' }} />
        </ListItemIcon>
        <ListItemText primary="Tancar Sessió" style={{ color: '#F44336' }} />
      </ListItem>
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirmar operació'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tancar sessió?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={() => logout()} color="primary" autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
