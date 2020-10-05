import { Button, Grid } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import http from 'services/http';
import EventCard from './EventCard';
import EventForm from './EventForm';
import Event from 'interfaces/Event';

import './style.css';

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>();
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<Event>();

  const retrieveData = async () => {
    try {
      const { data } = await http.get('/event');
      if (data) setEvents(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  if (!events) return null;

  return (
    <div>
      <div className="events-header">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEvent(undefined);
            setOpen(true);
          }}
        >
          Nou Event
        </Button>
      </div>
      <Grid container spacing={3}>
        {events.map(event => (
          <Grid item xs={12} sm={4} key={event._id}>
            <EventCard
              title={event.name}
              description={event.description}
              dateTime={dayjs(event.dateTime).toDate().toLocaleString()}
              coordinates={event.coordinates}
              onClickEdit={() => {
                setEvent(event);
                setOpen(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <EventForm
        open={open}
        setOpen={setOpen}
        onFinishSubmit={retrieveData}
        event={event}
      />
    </div>
  );
}
