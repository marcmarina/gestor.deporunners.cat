import React from 'react';

import { Grid, Paper } from '@material-ui/core';

import ChangePasswordForm from './ChangePasswordForm';

import './style.css';

export default function PreferencesScreen() {
  return (
    <div className="component-container">
      <h1>Prefèrencies</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper>
            <ChangePasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
