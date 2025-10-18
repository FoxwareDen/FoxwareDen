import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { UserSessionProvider } from "./store/auth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserSessionProvider>
        <App />
      </UserSessionProvider>
    </BrowserRouter>
  </StrictMode>
);
