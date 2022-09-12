import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/style.css';
import App from './app/app.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

