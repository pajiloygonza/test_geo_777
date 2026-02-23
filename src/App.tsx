import React from "react";
import { AppProviders } from "./app/providers/AppProviders";
import { LandingPage } from "./pages/landing/LandingPage";

export default function App() {
  return (
    <AppProviders>
      <LandingPage />
    </AppProviders>
  );
}
