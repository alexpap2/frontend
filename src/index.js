import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './Components/Form.js';
import Inventory from './Components/Inventory.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Inventory />} />
      <Route path = "/add" element = {<Form />} />
    </Routes>
  </BrowserRouter>
);
