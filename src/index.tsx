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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <MuiPickersUtilsProvider utils={DayJSUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
