import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { configure } from "mobx";
import Main from "./pages/router";
import store from "./store";
import "./assets/css/app.css";

configure({ enforceActions: true });

ReactDOM.render(
    <Provider {...store}>
        <Main />
    </Provider>,
    document.getElementById("root")
);
