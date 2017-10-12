import * as redux from 'redux'
import thunk from 'redux-thunk'
import {ticketsReducer, serchReducer, filterByReducer, authReducer, loaderReducer, sortReducer} from 'reducers';

export var configure = (initialState = {}) => {

  var reducer = redux.combineReducers({
    tickets: ticketsReducer,
    search: serchReducer,
    filterBy: filterByReducer,
    auth: authReducer,
    loader: loaderReducer,
    sort: sortReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

};
