import React from "react";
import App from "../App";
import {render, fireEvent, getByText, queryByTestId} from "@testing-library/react";

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
});

