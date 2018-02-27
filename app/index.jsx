import React from 'react';
import { render } from 'react-dom';
// import DevTools from 'mobx-react-devtools';
import App from './containers/App';
import './main.css';

render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default;
    render(
      <NewApp />,
      document.getElementById('root')
    );
  });
}
