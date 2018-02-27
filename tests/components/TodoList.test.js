import { shallow } from 'enzyme';
import React from 'react';
import TodoItem from '../../app/models/TodoItem';
import TodoList from '../../app/components/TodoList';
import TodoListStore from "../../app/models/TodoListStore";

describe('<TodoList>', () => {
  let todoListStore;
  const selectors = {
    todoInput: '.todo-list-container .content-section .todo-list-input',
    todoItems: '.todo-list-container .todo-items',
    remainingCount: '.todo-list-container .tasks-left',
    todoListForm: '.todo-list-container .todo-list-form'
  };

  beforeEach(() => {
    todoListStore = new TodoListStore();
    todoListStore.addTodoItem('Make Toast');
    todoListStore.addTodoItem('Lay down');
  });
  
  it("renders todo list", () => {
    const wrapper = shallow(
      <TodoList 
        todos={todoListStore.todos}
        newTodoTitle={'Fix the bed'}
        remainingCount={todoListStore.remainingCount}
        onFormSubmit={()=> _}
        onInputChange={()=> _}
        onDelete={()=> _}
      />);

    expect(wrapper.find(selectors.todoItems).children().length).toBe(2);
    expect(wrapper.find(selectors.remainingCount).text()).toBe('Tasks left: 2');
    expect(wrapper.find(selectors.todoInput).prop('value')).toBe('Fix the bed');
  });

  it("handles onDelete", () => {
    const mockOnDelete = jest.fn();

    const wrapper = shallow(
      <TodoList
        todos={todoListStore.todos}
        newTodoTitle={''}
        remainingCount={0}
        onFormSubmit={()=> _}
        onInputChange={()=> _}
        onDelete={mockOnDelete}
      />);
    wrapper.find("TodoListItem").at(0).prop('onDelete')(todoListStore.todos[0].id);

    expect(mockOnDelete.mock.calls.length).toBe(1);
    expect(mockOnDelete.mock.calls[0][0]).toBe(todoListStore.todos[0].id);
  });

  it("handles onFormSubmit", () => {
    const mockOnSubmitTodo = jest.fn();

    const wrapper = shallow(
      <TodoList
        todos={todoListStore.todos}
        newTodoTitle={''}
        remainingCount={2}
        onSubmitTodo={mockOnSubmitTodo}
        onInputChange={()=> _}
        onDelete={()=> _}
      />);

    wrapper.find(selectors.todoListForm).simulate('submit', { preventDefault() {} });
    expect(mockOnSubmitTodo.mock.calls.length).toBe(1);
  });

  it("handles onInputChange", () => {
    const mockOnInputChange = jest.fn();

    const wrapper = shallow(
      <TodoList
        todos={todoListStore.todos}
        newTodoTitle={''}
        remainingCount={2}
        onFormSubmit={() => _}
        onInputChange={mockOnInputChange}
        onDelete={() => _}
      />);

    wrapper.find(selectors.todoInput).simulate('change', { preventDefault() {} });
    expect(mockOnInputChange.mock.calls.length).toBe(1);
  });
});
