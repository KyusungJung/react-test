import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import createStore from "./createStore";
// import createHistory from "history/createBrowserHistory";
import createHistory from "history/createHashHistory";
import { ConnectedRouter } from "react-router-redux";

const history = createHistory();
const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter store={store} history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
