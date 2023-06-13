import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { CheckoutContextProvider } from './Context/CheckoutContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CheckoutContextProvider>
    <App />
    </CheckoutContextProvider>
  </Provider>
);

