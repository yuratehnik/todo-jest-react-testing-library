import React, {useContext, createContext, useState} from "react";
import {ContextValue, IProps} from "../types/types";
import {FILTER_ALL, FILTER_DONE, FILTER_UNDONE} from "./filterStates";


const FilterContext: ContextValue = createContext(null);

const FilterProvider = (props: IProps): JSX.Element => {
    const [filter, setFilter] = useState("")

    const onChangeFilter = (filter: string): void => {
        switch (filter){
            case FILTER_DONE:
                setFilter(FILTER_DONE);
                break;

            case FILTER_UNDONE:
                setFilter(FILTER_UNDONE)
                break;
            default:
                setFilter(FILTER_ALL);
        }
    }

    return (
        <FilterContext.Provider
            value={{
                filter: filter,
                setFilter: onChangeFilter
            }}>
            {props.children}
        </FilterContext.Provider>
    )
}

const useFilter = () => {
    return useContext(FilterContext)
}

export {FilterProvider, useFilter}