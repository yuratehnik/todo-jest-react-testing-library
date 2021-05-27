import React from "react";
import {mount,shallow} from 'enzyme';
import App from "../App";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const Enzyme = require("enzyme");

Enzyme.configure({ adapter: new Adapter() })

test('add element to list', () => {
    const app = mount(<App/>);

    app.find('form input').simulate('change', { target: { value: 'Hello' } });
    app.find('form button').simulate('submit');

    expect(app.find("ul.MuiList-root").text()).toEqual("Hello")
});