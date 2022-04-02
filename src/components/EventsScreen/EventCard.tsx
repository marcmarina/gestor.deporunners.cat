import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

import dayjs from 'dayjs';

import EventDialog from './EventDialog';

import Event from 'interfaces/Event';
import ConfirmDialog from 'components/common/ConfirmDialog';
import http from 'services/http';
import { useQueryClient } from 'react-query';

interface Props {
  event: Event;
  onClickEdit: () => void;
}

export default function EventCard({ event, onClickEdit }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();

  const { _id, name, description, dateTime, coordinates } = event;

  const deleteEvent = async () => {
    try {
      await http.delete(`/event/${_id}`);
      queryClient.invalidateQueries('events');
      setShowDialog(false);
      setShowDeleteDialog(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const formattedTime = dayjs(dateTime).format('DD/MM/YYYY HH:MM');
  return (
    <Card>
      <CardHeader title={name} subheader={formattedTime} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" noWrap component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          href={`http://www.google.com/maps/place/${coordinates}`}
          target="__blank"
          style={{ color: 'green' }}
        >
          <MapIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => setShowDialog(true)}>
          <InfoIcon />
        </IconButton>
        <IconButton
          onClick={onClickEdit}
          style={{ color: 'orange', marginLeft: 'auto' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          style={{ color: 'tomato' }}
          onClick={() => setShowDeleteDialog(true)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <EventDialog event={event} open={showDialog} setOpen={setShowDialog} />
      <ConfirmDialog
        text="Segur que vols eliminar aquest event? Aquesta acció es irreversible."
        title="Confirmar Operació"
        open={showDeleteDialog}
        handleYes={deleteEvent}
        handleNo={() => setShowDeleteDialog(false)}
      />
    </Card>
  );
}
