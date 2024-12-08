import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Doubt from '../doubt.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />
    {/* <Doubt /> */}
  </StrictMode>
);
