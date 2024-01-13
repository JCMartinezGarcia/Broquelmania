import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react';
import App from './App.tsx'
import axios from "axios";
import './index.css'

/**  set base URL for axios requests **/
//local URL
axios.defaults.baseURL = 'http://localhost:8000/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
        <App />
    </NextUIProvider>
  </React.StrictMode>,
)
