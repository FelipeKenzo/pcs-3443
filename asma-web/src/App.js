import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import PreQuestionnaire from './pages/components/prequestionnaire';

const history = createBrowserHistory;

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/questionnaire" component={PreQuestionnaire} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
