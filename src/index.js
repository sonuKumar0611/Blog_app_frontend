import React, { memo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './routes/routes';
import { Toaster } from 'react-hot-toast';

const App = memo(() => {
  return (
    <>
    <Routes />
    <Toaster />
    </>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
