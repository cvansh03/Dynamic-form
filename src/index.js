import React from 'react';
import ReactDOM from 'react-dom/client';
import DynamicFormBuilder from './DynamicFormBuilder.js';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DynamicFormBuilder />
  </React.StrictMode>
  
);
reportWebVitals();
