import React from 'react';
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TodoListItem from './TodoListItem';
import './TodoList.css';

export const TodoList = ({ todos, onSubmitTodo, newTodoTitle, onInputChange, remainingCount, onDelete }) => {
  const handleOnSubmitTodo = (e) => {
    e.preventDefault();
    onSubmitTodo();
  };

  const handleOnInputChange = (e) => {
    e.preventDefault();
    onInputChange(e);
  };

  const handleOnDelete = (id) => onDelete(id);

  return (
    <div className="card todo-list-container">
      <form className="todo-list-form" onSubmit={handleOnSubmitTodo}>
        <section className="header-section">
          <h1 className="text-center white-text">Things To Do</h1>
        </section>
        <section className="content-section">
          <input
            type="text"
            className="todo-list-input"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleOnInputChange}
          />
        </section>
      </form>
      <ul className="todo-items">
        {
          todos.map((todoItem) => (
            <TodoListItem todoItem={todoItem} key={todoItem.id} onDelete={handleOnDelete}/>))
        }
      </ul>
      <hr />
      <span className="text-italic tasks-left">Tasks left: {remainingCount}</span>
    </div>
  )
};

TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
  onSubmitTodo: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  newTodoTitle: PropTypes.string.isRequired,
  remainingCount: PropTypes.number.isRequired
};

export default observer(TodoList)