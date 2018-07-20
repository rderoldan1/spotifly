import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import reducers from './reducers';
import AppRouter from './components/AppRouter.jsx';

import './../scss/main.scss';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <CookiesProvider>
    <AppRouter />
  </CookiesProvider>
  ,document.getElementById('app')
);