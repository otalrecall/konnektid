import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from "react-router";
import Main from './pages/Main';
import Lists from './pages/Lists';
import List from './pages/List';

ReactDOM.render (
	<Router history={hashHistory}>
		<Route path="/" component={Main}></Route>
		<Route path="/lists" component={Lists}></Route>
		<Route path="/list/:id" component={List}></Route>
	</Router>, 
	document.getElementById('app')
);