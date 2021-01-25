import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import axios from "axios";
import {useDispatch} from "react-redux";

import {setPizzas} from "./redux/actions/pizzas";

import {Header} from './components'

import {Cart, Home} from "./pages";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get('http://localhost:3001/pizzas')
            .then(({ data }) => {
                dispatch(setPizzas(data))
            })
    }, [])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route exact path="/cart" component={Cart}/>
            </div>
        </div>
    );
}

export default App;
