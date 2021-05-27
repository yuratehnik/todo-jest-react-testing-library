import React from "react";
import {IReduxAction} from "../types/types";
import {ADD_ITEM, HANDLE_CHECKED, REMOVE_ITEM} from "./actionTypes";

const addTodoAction = (text: string) : IReduxAction => {
    return {
        type: ADD_ITEM,
        payload: text
    }
}

const removeTodoAction = (id: number) : IReduxAction => {
    return {
        type: REMOVE_ITEM,
        payload: id
    }
}

const handleCheckedTodo = (e: React.ChangeEvent<HTMLInputElement>, id: number) : IReduxAction => {
    return {
        type: HANDLE_CHECKED,
        payload: {
            event:e,
            id: id,
        }
    }
}

export {addTodoAction, removeTodoAction, handleCheckedTodo}