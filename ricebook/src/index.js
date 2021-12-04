import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./LoginPage/LoginPage";
import ProfileView from "./ProfileView/ProfileView";
import MainView from "./MainView/MainView";
import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import {riceBookReducer} from './reducers';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore.js';

// let {store, persistor} = configureStore();
function saveToLocalStorage(state) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}

function loadFromLocalStorage() {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const presistedState = loadFromLocalStorage();
const store = createStore(
    riceBookReducer,
    presistedState,
    composeEnhancers(applyMiddleware(thunk)),
);
store.subscribe(() => saveToLocalStorage(store.getState()));


ReactDOM.render(
        <Provider store={ store }>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
                <Router>
                    <Switch>
                        <Route exact path={"/"}>
                            <MainView/>
                        </Route>
                        <Route path={"/login"}>
                            <LoginPage/>
                        </Route>
                        <Route path={"/profile"}>
                            <ProfileView/>
                        </Route>
                    </Switch>
                </Router>
            {/*</PersistGate>*/}
        </Provider>
 ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();