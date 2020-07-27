import { observable, computed, action, runInAction } from "mobx";
import TodoItem from "./TodoItem";
import Parse from "parse";
import { ParseMobx } from "parse-mobx";

Parse.initialize("U84TlyqcG8WBYa1iDI9eksVQEDKPpEeD7FgC4zs2");
Parse.serverURL = "http://localhost:8000/parse";

export class TodoListStore {
  @observable todoItems = [];

  get todos() {
    return this.todoItems;
  }

  @computed
  get remainingCount() {
    return this.todoItems.filter((todo) => !todo.isDone).length;
  }

  @action
  addTodoItem(title) {
    if (title.trim().length > 0) {
      this.todoItems.push(new TodoItem(title));
    }
  }

  @action
  removeTodoItem(id) {
    this.todoItems = this.todoItems.filter((todo) => todo.id !== id);
  }

  @action
  async fetchTodos() {
    this.loading = true;
    const todos = await new Parse.Query("Todo").find();
    runInAction(() => {
      this.todoItems = ParseMobx.toParseMobx(todos);
      this.loading = false;
    });
  }
}

export default TodoListStore;
