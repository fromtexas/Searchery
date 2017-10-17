import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'

import firebase from 'firebaseConf'

import Main from 'Main'
import TaskList from 'TaskList'
import Map from 'Map'
import AddTask from 'AddTask'
import Person from 'Person'
import ShowTask from 'ShowTask'
import EditTask from 'EditTask'
import User from 'User'
import Registration from 'Registration'
import Hoc from 'Hoc'
import Preloader from 'Preloader'


const requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};


const requireLogout = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
  }
  next();
};


export default (
  <Router history = {hashHistory}>
    <Route path='/' component={Main}>
      <Route onEnter={requireLogin} path='user' component={User}/>
      <Route path='map' component={Map}/>
      <Route path='add' component={AddTask}/>
      <Route path='person' component={Person}/>
      <Route path='task/:id' component={ShowTask}/>
      <Route path='edit/:id' component={EditTask}/>
      <IndexRoute  component={Hoc(TaskList, Preloader)}/>
    </Route>
    <Route onEnter={requireLogout} path='registration' component={Registration}/>
    <Route onEnter={requireLogout} path='login' component={Registration}/>
  </Router>
);
