import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core"
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: { 
        primary:{
            main: blue[800]
        },
        secondary:{
            main: lightBlue[900],
            //color: light
        }
    } 
}, ptBR);

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorker.unregister();
