import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('serviceWorker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('serviceWorker Error al registrar:', error);
      });
  });
}


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
;
