import React from 'react';
import * as PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import TodoList from '../components/TodoList';
import { selectTodoListStore } from '../selectors/todoListStoreSelectors';


class UnwrappedTodoListContainer extends React.Component {
  @observable newTodoTitle = '';

  render() {
    const { todoListStore } = this.props;
    const handleOnInputChange = (e) => this.handleOnInputChange(e);
    const handleOnSubmitTodo = () => this.handleOnSubmitTodo();
    const handleOnDelete = (id) => this.handleOnDelete(id);

    return (
      <TodoList
        todos={todoListStore.todos}
        onInputChange={handleOnInputChange}
        onSubmitTodo={handleOnSubmitTodo}
        newTodoTitle={this.newTodoTitle}
        onDelete={handleOnDelete}
        remainingCount={todoListStore.remainingCount}
      />
    );
  }

  @action
  handleOnInputChange(e) {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleOnSubmitTodo() {
    this.props.todoListStore.addTodoItem(this.newTodoTitle);
    this.newTodoTitle = '';
  };

  @action
  handleOnDelete(id) {
    this.props.todoListStore.removeTodoItem(id);
  }
}

UnwrappedTodoListContainer.propTypes = {
};

export const TodoListContainer = inject(selectTodoListStore)(observer(UnwrappedTodoListContainer));
TodoListContainer.wrappedComponent.propTypes = {
  todoListStore: PropTypes.object.isRequired
};

export default TodoListContainer;