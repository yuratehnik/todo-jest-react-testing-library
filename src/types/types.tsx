import React from "react";

export interface IProps {
    children?:
        | JSX.Element
        | JSX.Element[]
        | string
        | string[];
}

export interface ITodoItem {
    id: number,
    isChecked: boolean,
    text: string
}

export type ContextValue = {
    Provider: React.Provider<any>,
    Consumer: React.Consumer<any>
} | null;

export interface IUseTodoList {
    todoList: ITodoItem[] | [];
    addItem: (text: string) => void;
    removeItem: (id: number) => void;
    handleChecked: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

export interface IReduxAction {
    type: string;
    payload: any;
}
