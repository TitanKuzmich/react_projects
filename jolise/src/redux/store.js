import {createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {routerMiddleware} from "connected-react-router";
import { createBrowserHistory } from 'history';

import rootReducer from "./reducers";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
)

export default store