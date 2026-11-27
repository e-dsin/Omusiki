import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Création du root React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optionnel : Masquer le loader initial après le montage de React
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }, 500);
  }
});

// Optionnel : Web Vitals pour mesurer les performances
// Si vous voulez mesurer les performances, décommentez et installez web-vitals
/*
import reportWebVitals from './reportWebVitals';
reportWebVitals(console.log);
*/
