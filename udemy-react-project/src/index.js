import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from '../src/containers/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App title="Relevant Persons"/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
