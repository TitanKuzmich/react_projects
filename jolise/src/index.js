import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from "connected-react-router";
import {Provider} from "react-redux";

import store from "./redux/store";
import {history} from "./redux/store";

import App from './App';

const renderApp = () => {
    const target = document.getElementById("root")
    if (!target) return

    try {
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>,
            target
        )
    } catch (err) {
        const div = document.createElement("div")
        div.innerHTML = "Что-то пошло не так... Попробуйте перезагрузить страницу"
        target.appendChild(div)
    }
}

renderApp()