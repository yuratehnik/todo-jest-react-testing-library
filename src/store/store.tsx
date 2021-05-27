import React from "react";
import {createStore} from "redux";
import {reducers, typeOfReducers} from "./reducers";

const todoStore: typeOfReducers = createStore(reducers)

export {todoStore}