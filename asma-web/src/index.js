import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core"
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: { 
        type: "light",
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
