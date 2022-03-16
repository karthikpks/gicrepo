import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppNavigator } from './navigations';
import { BrowserRouter } from "react-router-dom";
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppNavigator />
      </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
