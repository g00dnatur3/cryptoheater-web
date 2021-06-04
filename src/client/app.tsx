// import { isBrowser } from 'react-device-detect'
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

// PAGES -- TODO: LazyLoad
import { Home } from './components/pages/Home';

// import { ResetPasswordStep1 } from './components/pages/ResetPassword/Step1';
// import { ResetPasswordStep2 } from './components/pages/ResetPassword/Step2';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path='/home' component={Home} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));
