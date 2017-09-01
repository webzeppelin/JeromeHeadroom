import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import HomeContainer from "./components/home/HomeContainer";
import TestContainer from "./components/test/TestContainer"
import NotFound from "./components/NotFound";

// build the router
const app_router = (
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
      <Route exact path={ getAbsolutePath("") } component={HomeContainer}/>
      <Route path={ getAbsolutePath("test") } component={TestContainer}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);

// this is a kliudge and only works for the main page which is fine for the moment
function getAbsolutePath(relativePath) {
  let url = location;
  let pathname = url.pathname;
  // this is needed for IE which doesn't return the leading slash
  if (!pathname.startsWith("/")) pathname = "/"+pathname;
  return pathname + relativePath;
}

// export
export { app_router };
