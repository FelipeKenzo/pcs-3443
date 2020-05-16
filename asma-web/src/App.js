import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login';
import welcome from './pages/welcome';
import signup from './pages/signup';
import registerPatient from './pages/registerpatient';
import dashboard from './pages/dashboard';
import patientlist from './pages/patientlist';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={welcome} />
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
        <Route path="/dash" component={dashboard} />
        <Route exact path="/dash/acompanhamento" component={patientlist} />
        <Route exact path="/dash/register-patient" component={registerPatient} />
        {/*<Route exact path="/dashboard" component={dashboard} />*/}
      </div>
    </Router>
  );
}

export default App;
