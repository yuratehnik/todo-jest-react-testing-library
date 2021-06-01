import React from "react";
import {todoStore} from "../store/store";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import TodoList from "../components/TodoList/TodoList";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {FilterProvider} from "../context/filterContext";
import {addTodoAction} from "../store/actionGenerators";
import {act} from "@testing-library/react";
const Enzyme = require("enzyme");
Enzyme.configure({ adapter: new Adapter() })

describe( "Component TodoList should pass all tests",()=>{
    let component: any;
    beforeEach(()=>{
        component = mount(<Provider store={todoStore}>
            <FilterProvider>
                <TodoList/>
            </FilterProvider>
        </Provider>)
    })

    it("should contain 0 elements and 'empty' phrase", ()=>{
        expect(component.find(".MuiList-root.MuiList-padding").text()).toBe("Your list is empty")
    })

    it("should have new item after adding", ()=>{
        act(() => {
            todoStore.dispatch(addTodoAction("one new todo"))
        });
        expect(component.find(".MuiList-root.MuiList-padding").text()).toBe("one new todo")
    })
})