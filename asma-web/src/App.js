import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import signup from './pages/signup';
import registerPatient from './pages/registerpatient';
import Home from './pages/home';
import patientlist from './pages/patientlist';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/acompanhamento" component={patientlist} />
        <Route exact path="/register-patient" component={registerPatient} />
        {/*<Route exact path="/dashboard" component={dashboard} />*/}
      </div>
    </Router>
  );
}

export default App;
