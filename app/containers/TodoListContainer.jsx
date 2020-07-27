import React from "react";
import * as PropTypes from "prop-types";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import TodoList from "../components/TodoList";
import { selectTodoListStore } from "../selectors/todoListStoreSelectors";

class UnwrappedTodoListContainer extends React.Component {
  componentDidMount() {
    this.props.todoListStore.fetchTodos();
  }

  @observable newTodoTitle = "";

  render() {
    const { todoListStore } = this.props;
    const handleOnInputChange = (e) => this.handleOnInputChange(e);
    const handleOnSubmitTodo = () => this.handleOnSubmitTodo();
    const handleOnDelete = (todoItem) => this.handleOnDelete(todoItem);
    const handleOnChange = (todoItem) => this.handleOnChange(todoItem);

    return (
      <TodoList
        todos={todoListStore.todos}
        onInputChange={handleOnInputChange}
        onSubmitTodo={handleOnSubmitTodo}
        newTodoTitle={this.newTodoTitle}
        onDelete={handleOnDelete}
        onChange={handleOnChange}
        remainingCount={todoListStore.remainingCount}
      />
    );
  }

  @action
  handleOnInputChange(e) {
    this.newTodoTitle = e.target.value;
  }

  @action
  handleOnSubmitTodo() {
    this.props.todoListStore.addTodoItem(this.newTodoTitle);
    this.newTodoTitle = "";
  }

  @action
  handleOnDelete(todoItem) {
    this.props.todoListStore.removeTodoItem(todoItem);
  }

  @action
  handleOnChange(todoItem) {
    this.props.todoListStore.updateTodo(todoItem);
  }
}

UnwrappedTodoListContainer.propTypes = {};

export const TodoListContainer = inject(selectTodoListStore)(
  observer(UnwrappedTodoListContainer)
);
TodoListContainer.wrappedComponent.propTypes = {
  todoListStore: PropTypes.object.isRequired,
};

export default TodoListContainer;
