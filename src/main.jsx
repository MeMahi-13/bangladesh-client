import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
} from "react-router";
import './index.css';
import AuthProvider from './provider/AuthProvider.jsx';
import { router } from './Router/Router.jsx';

createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
 </AuthProvider>
)
