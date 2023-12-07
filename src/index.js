import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));



if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
}


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
;
