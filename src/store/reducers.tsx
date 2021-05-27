import React from "react";
import {combineReducers, Reducer} from "redux";
import {ITodoItem, IReduxAction} from "../types/types";
import {ADD_ITEM, REMOVE_ITEM, HANDLE_CHECKED} from "./actionTypes";

const initialState: Array<ITodoItem> = [];

export const todoReducer: Reducer<Array<ITodoItem>, IReduxAction> = (state: ITodoItem[] = initialState, action: IReduxAction) => {
    switch (action.type) {
        case ADD_ITEM:
            const newItem: ITodoItem = {
                text: action.payload,

                isChecked: false,
                id: new Date().getTime()
            }

            return [...state, newItem]

        case REMOVE_ITEM:
            let newArrayForRemove = [...state.map(item => {return {...item}})];
            const itemIndex = newArrayForRemove.findIndex((item) => item.id === action.payload)
            newArrayForRemove.splice(itemIndex, 1);

            return [...newArrayForRemove]

        case HANDLE_CHECKED:
            const newCheckedStatus = action.payload.event.target.checked;
            const newArrayForHandleChecked = [...state.map((item: ITodoItem)=>{
                let newItem = {...item}
                if(newItem.id === action.payload.id) {
                    newItem.isChecked = newCheckedStatus;
                }
                return newItem;
            })]

            return [...newArrayForHandleChecked]
        default:
            return state
    }
}

export const reducers = combineReducers({
    todos: todoReducer
} as any);

export type typeOfReducers = ReturnType<typeof reducers>;