import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import EventCard from './EventCard';
import EventForm from './EventForm';
import Event from 'interfaces/Event';

import './style.css';
import { useQuery, useQueryClient } from 'react-query';
import http from 'services/http';

export default function EventsScreen() {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState<Event | undefined>();
  const queryClient = useQueryClient();

  const { data: events, isLoading: eventsLoading } = useQuery(
    'events',
    async () => (await http.get('/event')).data
  );

  if (eventsLoading) return null;

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
        {events.map((event) => (
          <Grid item sm={12} md={6} lg={3} key={event._id}>
            <EventCard
              event={event}
              onClickEdit={() => {
                setOpen(true);
                setEvent(event);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <EventForm
        open={open}
        setOpen={setOpen}
        event={event}
        onFinishSubmit={() => queryClient.invalidateQueries('events')}
      />
    </div>
  );
}
