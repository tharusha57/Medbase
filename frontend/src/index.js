import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { ModalContextProvider } from './context/ModalContext';
import { AuthContextProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


