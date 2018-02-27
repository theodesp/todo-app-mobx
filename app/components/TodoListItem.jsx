import React from 'react';
import { observer } from 'mobx-react';
import * as PropTypes from 'prop-types';
import './TodoListItem.css'

export const TodoListItem = ({ todoItem, onDelete }) =>  {
  const handleOnItemClick = () => (todoItem.isDone = !todoItem.isDone);
  const handleOnDelete = (id) => () =>  {
    onDelete(id)
  };

  return (
    <li className="todo-list-item">
      <div className={`round-checkbox ${todoItem.isDone ? 'checked' : ''}`}>
        <input
          id={`checkbox-item-${todoItem.id}-input`}
          type="checkbox"
          checked={todoItem.isDone}
        />
        <label id={`checkbox-item-${todoItem.id}-label`} onClick={handleOnItemClick}/>
      </div>
      <span className="todo-list-title">{todoItem.title}</span>
      <i
        className="far fa-trash-alt destroy clickable"
        id={`checkbox-item-destroy-${todoItem.id}-icon`}
        onClick={handleOnDelete(todoItem.id)}
      />
    </li>
  )
};

TodoListItem.propTypes = {
  todoItem: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default observer(TodoListItem);