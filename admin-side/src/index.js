import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import { Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store ={store}>
    <App />
    </Provider>
    </Router>
   
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
