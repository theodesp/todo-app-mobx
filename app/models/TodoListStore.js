import { observable, computed, action } from "mobx";
import TodoItem from "./TodoItem";
import Parse from "parse/react-native";
import { ParseMobx } from "parse-mobx";

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
    const todos = await new Parse.Query("todo").find();
    runInAction(() => {
      this.todos = ParseMobx.toParseMobx(todos);
      this.loading = false;
    });
  }
}

export default TodoListStore;
