import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/Info';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import Event from 'interfaces/Event';
import dayjs from 'dayjs';
import TextWithLabel from 'components/common/TextWithLabel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    text: {
      maxLines: 3,
    },
  })
);

interface Props {
  event: Event;
  onClickEdit: () => void;
}

export default function EventCard({ event, onClickEdit }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const classes = useStyles();
  const { name, description, dateTime, coordinates, members } = event;

  const formattedTime = dayjs(dateTime).format('DD/MM/YYYY HH:MM');
  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={name} subheader={formattedTime} />
        <CardContent>
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            noWrap
            component="p"
          >
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
      </Card>
      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => setShowDialog(false)}
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
                text={`${members.length} soci${
                  members.length === 1 ? '' : 's'
                }`}
                variant="text"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
