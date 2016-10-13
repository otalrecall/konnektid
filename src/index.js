import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
import Main from './pages/Main';
import Lists from './pages/Lists';
import List from './pages/List';
import Task from './pages/Task';

ReactDOM.render (
	<Router history={browserHistory}>
		<Route path="/" component={Main}></Route>
		<Route path="/lists" component={Lists}></Route>	
		<Route path="/list/:id" component={List}></Route>
		<Route path="/task/:id" component={Task}></Route>
	</Router>, 
	document.getElementById('app')
);