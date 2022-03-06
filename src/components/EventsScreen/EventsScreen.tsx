import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';

import EventCard from './EventCard';
import EventForm from './EventForm';
import Event from 'interfaces/Event';

import './style.css';
import { fetchEvents } from 'redux/events/eventActions';
import { connect } from 'react-redux';

interface EventsScreenState {
  open: boolean;
  event?: Event[];
}
class EventsScreen extends Component<any, EventsScreenState> {
  state = {
    open: false,
    event: undefined,
  };

  setOpen = (value: boolean) => {
    this.setState({ open: value });
  };

  componentDidMount() {
    this.props.dispatch(fetchEvents());
  }

  render() {
    const { events } = this.props;

    if (!events) return null;

    return (
      <div>
        <div className="events-header">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.setState({
                open: true,
                event: undefined,
              })
            }
          >
            Nou Event
          </Button>
        </div>
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item sm={12} md={6} lg={3} key={event._id}>
              <EventCard
                event={event}
                onClickEdit={() => this.setState({ open: true, event: event })}
              />
            </Grid>
          ))}
        </Grid>
        <EventForm
          open={this.state.open}
          setOpen={this.setOpen}
          event={this.state.event}
          onFinishSubmit={() => this.props.dispatch(fetchEvents())}
        />
      </div>
    );
  }
}

function mapState(state) {
  return {
    events: state.event.items,
  };
}

export default connect(mapState)(EventsScreen);
