import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PageLoading } from "components/PageLoading";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "@/i18n";
import "./flexible";
import "./App.less";
import { ErrorBoundary } from "./components/errorBoundary";
import { Frame } from "./components/frame";
const listen = () => {
  if (document.readyState === "complete") {
    ReactDOM.render(
      <StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <Suspense fallback={<div></div>}>
              <Frame>
                <App />
              </Frame>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </StrictMode>,
      document.getElementById("root")
    );
  } else {
    // assert is loading
    ReactDOM.render(
      <React.StrictMode>
        <PageLoading />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
};

document.onreadystatechange = listen;

serviceWorker.unregister();
