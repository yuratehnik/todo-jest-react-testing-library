import React from "react";
import {Checkbox, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {IReduxAction, ITodoItem} from "../../types/types";
import {handleCheckedTodo, removeTodoAction} from "../../store/actionGenerators";
import {connect} from "react-redux";
interface ITodoListItem {
    item: ITodoItem;
    removeTodoAction: (id: number) => IReduxAction;
    handleCheckedTodo: (e: React.ChangeEvent<HTMLInputElement>, id: number) => IReduxAction;
}

const TodoListItem: React.FC<ITodoListItem> = ({item, handleCheckedTodo, removeTodoAction}) => {
    return (
        <ListItem
            key={item.id}
            divider>
            <ListItemIcon>
                <Checkbox
                    checked={item.isChecked}
                    onChange={(e)=>handleCheckedTodo(e, item.id)}
                />
            </ListItemIcon>
            <ListItemText
                primary={item.text}
                style={{ textDecoration : item.isChecked ? 'line-through' : 'none' }}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={()=>{removeTodoAction(item.id)}}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
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
)(TodoListItem);

export default ComponentContainer;