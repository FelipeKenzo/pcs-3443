import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core"

const theme = createMuiTheme();

ReactDOM.render(
  <React.StrictMode>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
