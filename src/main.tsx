import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageContext";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New contents from Barkati Masjid. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline!");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
