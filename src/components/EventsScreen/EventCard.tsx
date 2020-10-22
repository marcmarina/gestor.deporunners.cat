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

import dayjs from 'dayjs';

import EventDialog from './EventDialog';

import Event from 'interfaces/Event';

interface Props {
  event: Event;
  onClickEdit: () => void;
}

export default function EventCard({ event, onClickEdit }: Props) {
  const [showDialog, setShowDialog] = useState(false);

  const { name, description, dateTime, coordinates } = event;

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
        <IconButton onClick={onClickEdit}>
          <EditIcon />
        </IconButton>
        <IconButton
          href={`http://www.google.com/maps/place/${coordinates}`}
          target="__blank"
        >
          <MapIcon />
        </IconButton>
        <IconButton onClick={() => setShowDialog(true)}>
          <InfoIcon />
        </IconButton>
      </CardActions>
      <EventDialog event={event} open={showDialog} setOpen={setShowDialog} />
    </Card>
  );
}
