import React from 'react';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import calendarAppReducer from './redux/reducers';
import './index.css';

declare global {
	interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : any; }
}

const Root = ({ children, initialState = {} }) => {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(calendarAppReducer, initialState, composeEnhancers(applyMiddleware()));

	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}

export { Root as default };