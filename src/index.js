import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Assuming your index.html file has a div with id='root'
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  // React Strict Mode is a development tool for highlighting potential problems in
  // an application. It intentionally doubles the invocation of certain functions,
  // such as the render method and functions passed to useState, useMemo, or
  // useEffect hooks, to help you detect side effects. This behavior does not
  // impact the production build of your application.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
