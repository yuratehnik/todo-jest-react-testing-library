import React from 'react';
import './App.css';
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import {Provider} from "react-redux";
import {todoStore} from "./store/store";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import {FilterProvider} from "./context/filterContext";

const App: React.FC = () => {

  return (
    <div className="App">
      <Provider store={todoStore}>
          <TodoInput/>
          <FilterProvider>
              <TodoFilter/>
              <TodoList/>
          </FilterProvider>
      </Provider>
    </div>
  );
}

export default App;
