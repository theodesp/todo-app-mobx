import { shallow } from 'enzyme';
import React from 'react';
import TodoItem from '../../app/models/TodoItem';
import TodoListItem from '../../app/components/TodoListItem';

describe('<TodoListItem>', () => {
  let item;
  const selectors = {
    todoTitle: '.todo-list-item .todo-list-title',
    checkBoxInput: '.todo-list-item .round-checkbox > input',
    checkBoxLabel: '.todo-list-item .round-checkbox > label',
    deleteIcon: '.todo-list-item i.destroy'
  };

  beforeEach(() => {
    item = new TodoItem('Make toast');
  });

  it("renders todo item", () => {
    const wrapper = shallow(<TodoListItem todoItem={item} onDelete={() => _} />);
    expect(wrapper.find(selectors.todoTitle).text()).toBe('Make toast');
    expect(wrapper.find(selectors.checkBoxInput).props().checked).toBeFalsy();
  });

  it("handles onDelete", () => {
    const mockOnDelete = jest.fn();

    const wrapper = shallow(<TodoListItem todoItem={item} onDelete={mockOnDelete} />);
    wrapper.find(selectors.deleteIcon).simulate('click');

    expect(mockOnDelete.mock.calls.length).toBe(1);
    expect(mockOnDelete.mock.calls[0][0]).toBe(item.id);
  });

  it("handles checkbox event and updates isDone", () => {

    const wrapper = shallow(<TodoListItem todoItem={item} onDelete={() => _} />);
    wrapper.find(selectors.checkBoxLabel).simulate('click');

    expect(item.isDone).toBeTruthy();
  })
});

