import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import DayJSUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
