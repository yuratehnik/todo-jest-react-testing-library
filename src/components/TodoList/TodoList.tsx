import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {ITodoItem} from "../../types/types";
import {Container, List} from "@material-ui/core";
import {removeTodoAction, handleCheckedTodo} from "../../store/actionGenerators";
import {connect} from "react-redux";
import {todoStore} from "../../store/store"
import {useFilter} from "../../context/filterContext";
import {FILTER_ALL} from "../../context/filterStates";
import TodoListItem from "../TodoListItem/TodoListItem";
import {filterTodoList} from "../../helpers/filterTodoList";
import {Pagination} from "@material-ui/lab";
const cloneDeep = require('lodash.clonedeep');



const TodoList: React.FC = () => {
    const [todoList, setTodoList] = useState<Array<ITodoItem>>([])
    const [currentFilter, setCurrentFilter] = useState<string>(FILTER_ALL)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {filter} = useFilter();
    const itemsOffset = 10;

    useEffect(()=>{
        const unsubscribe = todoStore.subscribe(() => {
            setTodoList(todoStore.getState().todos);
        });

        return ()=>{
            unsubscribe()
        }
    },[])

    useEffect(()=>{
        setCurrentFilter(filter);
        setCurrentPage(1);
    }, [filter])

    const handlePagination = (event : ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const memoizedFilteredItems = useMemo(()=> {
        return filterTodoList(todoList, currentFilter).reverse();
    }, [todoList, currentFilter]);

    const filteredItemsCopy = cloneDeep(memoizedFilteredItems);
    const pageOfFilteredItems = filteredItemsCopy.splice((currentPage - 1) * itemsOffset, itemsOffset);

    if(pageOfFilteredItems.length < 1 && currentPage > 1) {
        setCurrentPage((page)=>{
            return page - 1;
        })
    }

    const listOfComponents: JSX.Element[] | JSX.Element = pageOfFilteredItems.length > 0 ? pageOfFilteredItems.map((item: ITodoItem) => {
            return <TodoListItem key={item.id} item={item}/>
        }) :
        (<>Your list is empty</>);

    const pageSize = Math.ceil(memoizedFilteredItems.length / itemsOffset);

    return(
        <Container>
            <List data-testid="todo_items_container">
                {listOfComponents}
            </List>
            <Pagination
                count={pageSize}
                page={currentPage}
                onChange={handlePagination}
                data-testid="todo_pagination"
            />
        </Container>
    )
}

const mapStateToProps = (state: ITodoItem[]) => ({
    state: state,
});

const mapDispatchToProps = {
    removeTodoAction,
    handleCheckedTodo
};

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default ComponentContainer;