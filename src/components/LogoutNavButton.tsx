import { useAuth0 } from '@auth0/auth0-react';
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
import React, { useState } from 'react';

export default function LogoutNavButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { logout } = useAuth0();

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
        onClose={() => setDialogOpen(false)}
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
          <Button
            onClick={() =>
              logout({
                returnTo: window.location.origin,
              })
            }
            color="primary"
            autoFocus
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
