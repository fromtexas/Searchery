import * as redux from 'redux'
import thunk from 'redux-thunk'
import {ticketsReducer, serchReducer, filterByReducer, authReducer, loaderReducer, sortReducer, errorReducer} from 'reducers';

export const configure = (initialState = {}) => {

  const reducer = redux.combineReducers({
    tickets: ticketsReducer,
    search: serchReducer,
    filterBy: filterByReducer,
    auth: authReducer,
    loader: loaderReducer,
    sort: sortReducer,
    error: errorReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

};
