import { TodoListStore } from '../../app/models/TodoListStore';

describe("TodoListStore model", () => {
  let store;

  beforeEach(() => {
    store = new TodoListStore();
  });

  it('initializes correctly with an empty todo list', () => {
    expect(store.todos.length).toBe(0);
    expect(store.remainingCount).toBe(0);
  });

  it('adds todo list items', () => {
    store.addTodoItem('make toast');
    store.addTodoItem('take out bins');

    expect(store.todos.length).toBe(2);
    expect(store.remainingCount).toBe(2);
  });

  it('removes todo list items by id', () => {
    store.addTodoItem('make toast');
    store.addTodoItem('take out bins');

    const firstTodo = store.todos[0];
    store.removeTodoItem(firstTodo.id);

    expect(store.todos.length).toBe(1);
    expect(store.remainingCount).toBe(1);
  });

  it('computes remaining count', () => {
    store.addTodoItem('make toast');
    store.addTodoItem('take out bins');

    const firstTodo = store.todos[0];
    firstTodo.isDone = true;

    expect(store.todos.length).toBe(2);
    expect(store.remainingCount).toBe(1);
  })
});