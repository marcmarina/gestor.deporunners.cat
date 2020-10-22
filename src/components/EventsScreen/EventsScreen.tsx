import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import http from 'services/http';
import EventCard from './EventCard';
import EventForm from './EventForm';
import Event from 'interfaces/Event';

import './style.css';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>();
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
            setOpen(true);
            setEvent(undefined);
          }}
        >
          Nou Event
        </Button>
      </div>
      <Grid container spacing={4}>
        {events.map(event => (
          <Grid item sm={12} md={6} lg={3} key={event._id}>
            <EventCard
              event={event}
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
