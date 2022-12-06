import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GridContextProvider } from "./store/GridContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GridContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GridContextProvider>
  </React.StrictMode>
);
