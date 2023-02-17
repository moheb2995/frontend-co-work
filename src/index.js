import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import store from './Redux/Store'
import { Provider } from 'react-redux'
import App from './App';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App/>
  </Provider>
);
reportWebVitals();


