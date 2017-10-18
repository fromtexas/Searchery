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

const store = configure();

store.dispatch(actions.startGetTasks());

const locationCheck = () => {
    if(window.location.hash.indexOf('task') === -1) {
          hashHistory.push('/')
      }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login({uid: user.uid, email: user.email}));
    store.dispatch(actions.errorMsg(''));
    locationCheck();
  } else {
     store.dispatch(actions.logout());
     locationCheck();
  }
});





ReactDOM.render(<Provider store={store}>
                  {Router}
                </Provider>
                  ,document.getElementById('app'));
