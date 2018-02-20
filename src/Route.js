/**
 * Created by gouravsoni on 22/10/17.
 */

import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Home from './App'
import UserDetails  from './components/UserDetails'

const Routes = (props) => (
    <Router {...props}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user/:user" component={UserDetails}/>
        </Switch>
    </Router>
);

export default Routes;