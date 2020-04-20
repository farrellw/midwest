import * as React from "react";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Route path="/">
        <App />
      </Route>
      <Route path="/results">
        <Results />
      </Route>
    </BrowserRouter>
  );
}

function Results() {
  return (
    <div>
      <h2>Results</h2>
    </div>
  );
}

export default Router;
