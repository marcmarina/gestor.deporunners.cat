import { Button, Grid } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import http from 'services/http';
import EventCard from './EventCard';
import NewEvent from './NewEvent';

import './style.css';

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>();
  const [open, setOpen] = useState(false);

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
          onClick={() => setOpen(true)}
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
            />
          </Grid>
        ))}
      </Grid>
      <NewEvent open={open} setOpen={setOpen} onFinishSubmit={retrieveData} />
    </div>
  );
}
