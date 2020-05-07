import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login'
import welcome from './pages/welcome'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={welcome} />
          <Route exact path="/login" component={login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
