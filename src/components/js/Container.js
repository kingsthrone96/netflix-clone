import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Todos from "./Todos";
import AddTodos from "./AddTodos";
import EditTodo from "./EditTodos";

export default function Container() {
  return (
    <HashRouter>
      <Navbar />
      <Route exact path="/">
        <Todos />
      </Route>
      <Route path="/addTodos">
        <AddTodos />
      </Route>
      <Route path="/editTodo/:id">
        <EditTodo />
      </Route>
    </HashRouter>
  );
}
