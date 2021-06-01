import React from "react";
import App from "../App";
import {render, fireEvent, getByText, queryByTestId, queryByText} from "@testing-library/react";

describe('<App/>', () => {
    let app;
    beforeEach(()=>{
        app = render(<App/>);
    })

    it('should show element that has been added to list', () => {
        fireEvent.change(app.container.querySelector('#todo-text'), { target: { value: 'Hello Task!' } })
        fireEvent.submit(queryByTestId(app.container, "todo_form"))

        expect(getByText(app.container, "Hello Task!")).toBeTruthy();
    });

    it("should have only 10 items per page (newer first)", ()=>{
        //add first element
        fireEvent.change(app.container.querySelector('#todo-text'), { target: { value: 'First Task!' } })
        fireEvent.submit(queryByTestId(app.container, "todo_form"))
        expect(getByText(app.container, "First Task!")).toBeTruthy();

        //add 10 new items to move first element to second page of pagination
        for (let i = 0; i <= 10; i++) {
            fireEvent.change(app.container.querySelector('#todo-text'), { target: { value: 'Another Task!' } })
            fireEvent.submit(queryByTestId(app.container, "todo_form"))
        }
        expect(queryByText(app.container, "First Task!")).toBeNull();

        //move to second page and check if first element on this page
        fireEvent.click(app.container.querySelectorAll("nav[data-testid='todo_pagination'] li button")[2])
        expect(getByText(app.container, "First Task!")).toBeTruthy();
    })
});

