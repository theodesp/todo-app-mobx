import { observable } from 'mobx';
import uuid from 'uuid';

export class TodoItem {
  id = uuid();
  @observable title;
  @observable isDone;

  constructor(title, isDone = false) {
    this.title = title;
    this.isDone = isDone;
  }
}

export default TodoItem