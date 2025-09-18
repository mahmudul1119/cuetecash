import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add a lightweight fetch wrapper to attach JWT if present
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const token = localStorage.getItem('authToken');
  const headers = new Headers(init?.headers || undefined);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return originalFetch(input, { ...(init || {}), headers });
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
