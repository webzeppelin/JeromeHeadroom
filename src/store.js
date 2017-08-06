import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import freeze from "redux-freeze";
import { reducers } from "./reducers/_root";
import { sagas } from "./sagas/_root";

// add the middlewares
let middlewares = [];

// add the router middleware
middlewares.push(routerMiddleware(browserHistory));

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
}

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(reducers, middleware);
const history = browserHistory ? syncHistoryWithStore(browserHistory, store) : syncHistoryWithStore(createBrowserHistory(), store);
// store.subscribe(() => {
// console.log("Store updated");
// console.log(store.getState());
//});

sagaMiddleware.run(sagas);

// export
export { store, history };
