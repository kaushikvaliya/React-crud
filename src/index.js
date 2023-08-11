import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Mainrouter from './Mainroutes';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

    <BrowserRouter>
      <Mainrouter />
    </BrowserRouter>

  </>

);

