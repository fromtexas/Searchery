import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {hashHistory} from 'react-router'

import css from './style.scss'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ionicons from '../node_modules/ionicons/dist/css/ionicons.min.css'

import firebase from 'firebaseConf'
import Router from 'app/router/'
import {configure} from 'configureStore'
import * as actions from 'actions'

var store = configure();

var task = {
  name: 'ticket',
  location: 'Myasnitskaya ul., 13с1',
  info: 'info',
  description: 'description',
  city: 'Moscow',
  category: 'Pets',
  reward: 'reward'
};
//store.dispatch(actions.addTask(task));
//store.dispatch(actions.startAddTask(task));
store.dispatch(actions.startGetTasks());

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login({uid: user.uid, email: user.email}));
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/')
  }
});





ReactDOM.render(<Provider store={store}>
                  {Router}
                </Provider>
                  ,document.getElementById('app'));
