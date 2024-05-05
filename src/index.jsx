import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element
const container = document.getElementById('main');

// Create a root
const root = createRoot(container); // createRoot instead of ReactDOM.render

// Initial render: Render the <App /> into the root
root.render(<App />);
