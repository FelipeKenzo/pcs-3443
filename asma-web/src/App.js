import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';
import Chart from './pages/components/patientdetails';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/chart" component={Chart} />
      </div>
    </Router>
  );
}

export default App;
