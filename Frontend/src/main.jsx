import { StrictMode } from 'react'
import { ClerkProvider, SignedIn } from '@clerk/clerk-react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { SyncUser } from "./components/Sync-User";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (clerkPubKey) {
  // console.log("clerkPub key : ", clerkPubKey);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <SignedIn>
          <SyncUser />
        </SignedIn>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)
