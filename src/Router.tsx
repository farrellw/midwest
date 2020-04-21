import * as React from "react";
import App from "./App";
import Results from "./Results";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
