import React, {useState} from "react";
import {Button, TextField, FormControl, Container} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {connect} from "react-redux";
import {addTodoAction} from "../../store/actionGenerators";
import {IReduxAction, ITodoItem} from "../../types/types";

interface TodoInputProps{
    addTodoAction: (text: string)=> IReduxAction;
}

const TodoInput: React.FC<TodoInputProps> = ({addTodoAction}) => {
    const [inputText, setInputText] = useState<string>("");
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement> ) : void => {
        const text: string = e.target.value;
        setInputText(text);
    }

    const submitHandler = (e: React.FormEvent) : void => {
        e.preventDefault();
        if(inputText !== "") {
            addTodoAction(inputText)
            setInputText("");
        }
    }

    return(
        <Container>
            <form
                onSubmit={submitHandler}
                data-testid="todo_form">

                <FormControl
                    fullWidth>
                    <TextField
                        label="Write your task here."
                        variant="outlined"
                        id="todo-text"
                        name="todo-text"
                        value={inputText}
                        onChange={inputHandler}
                        margin="normal"
                        required={true}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        data-testid="form_submit">
                        <PlaylistAddIcon/>
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

const mapStateToProps = (state: ITodoItem[]) => ({
    state: state,
});

const mapDispatchToProps = {
    addTodoAction,
};

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoInput);

export default ComponentContainer;