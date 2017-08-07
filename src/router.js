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
      <Route exact path="/" component={HomeContainer}/>
      <Route path="/test" component={TestContainer}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);

// export
export { app_router };
