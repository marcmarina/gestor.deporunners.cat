import React from 'react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import TextWithLabel from 'components/common/TextWithLabel';

import Event from 'interfaces/Event';
import dayjs from 'dayjs';

interface Props {
  event: Event;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventDialog({ event, open, setOpen }: Props) {
  const { name, coordinates, dateTime, description, members } = event;
  const formattedTime = dayjs(dateTime).format('DD/MM/YYYY HH:MM');

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">{name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextWithLabel
              label="Descripció"
              text={description}
              variant="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextWithLabel
              label="Dia i Hora"
              text={formattedTime}
              variant="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextWithLabel
              label="Coordenades"
              text={coordinates}
              variant="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextWithLabel
              label="Socis"
              text={`${members.length} soci${members.length === 1 ? '' : 's'}`}
              variant="text"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
