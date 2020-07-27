import { observable, computed, action, runInAction } from "mobx";
import TodoItem from "./TodoItem";
import Parse from "parse";
import { ParseMobx } from "parse-mobx";

Parse.initialize("U84TlyqcG8WBYa1iDI9eksVQEDKPpEeD7FgC4zs2");
Parse.serverURL = "http://localhost:8000/parse";

const Todo = Parse.Object.extend("Todo");

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
  async addTodoItem(title = "unknown") {
    const newTodo = await new Todo()
      .set("title", title)
      .set("isDone", false)
      .save();
    runInAction(() => {
      this.todoItems.push(ParseMobx.toParseMobx(newTodo));
    });
  }

  @action
  updateTodo(todo) {
    const isDone = !todo.attributes.isDone;
    todo.set("isDone", isDone).save();
  }

  @action
  async removeTodoItem(todo) {
    await todo.destroy();
    runInAction(() => {
      ParseMobx.deleteListItem(this.todoItems, todo);
    });
  }

  @action
  async fetchTodos() {
    const todos = await new Parse.Query("Todo").find();
    runInAction(() => {
      this.todoItems = ParseMobx.toParseMobx(todos);
    });
  }
}

export default TodoListStore;
