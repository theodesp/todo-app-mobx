import { TodoItem } from '../../app/models/TodoItem';

describe("TodoItem model", () => {
  let item;

  it('initialises correctly with an title and an id', () => {
    item = new TodoItem('Take out bins');

    expect(item.id).toBeDefined();
    expect(item.title).toBe('Take out bins');
    expect(item.isDone).toBeFalsy();
  });
});