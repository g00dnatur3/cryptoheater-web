// import { isBrowser } from 'react-device-detect'
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

// PAGES -- TODO: LazyLoad
import { Home } from './components/pages/Home';
import { CryptoSettings } from './components/pages/CryptoSettings';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path='/home' component={Home} />
      <Route exact path='/crypto-settings' component={CryptoSettings} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));
