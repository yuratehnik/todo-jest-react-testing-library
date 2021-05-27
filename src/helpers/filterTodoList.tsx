import React from "react";
import {ITodoItem} from "../types/types";
import {FILTER_ALL, FILTER_DONE, FILTER_UNDONE} from "../context/filterStates";
const cloneDeep = require('lodash.clonedeep');

const filterTodoList = (items: ITodoItem[], filter: string = FILTER_ALL) : ITodoItem[] => {
    switch (filter) {
        case FILTER_DONE:
            let newArrayDone = cloneDeep(items);

            return newArrayDone.filter((item: ITodoItem) => item.isChecked);
        case FILTER_UNDONE:
            let newArrayUndone = cloneDeep(items);

            return newArrayUndone.filter((item: ITodoItem) => !item.isChecked);
        default:
            let newArrayAll = cloneDeep(items);
            return newArrayAll;
    }
}

export {filterTodoList}