import React from 'react';
import { Provider } from 'mobx-react';
import TodoListContainer  from './TodoListContainer';
import TodoListStore from '../models/TodoListStore';
import '../typography.config';

export class App extends React.Component {
  constructor() {
    super();
    this.store = new TodoListStore();
  }

  render() {
    return (
      <Provider todoListStore={this.store}>
        <TodoListContainer />
      </Provider>
    )
  }
}

export default App