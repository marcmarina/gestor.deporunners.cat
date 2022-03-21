import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import DayJSUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import rootReducer from 'redux/rootReducer';
import { Grommet } from 'grommet';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const theme = {
  global: {
    font: {
      family: 'Roboto',
    },
  },
};

ReactDOM.render(
  <Grommet plain>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <MuiPickersUtilsProvider utils={DayJSUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </Grommet>,
  document.getElementById('root')
);
