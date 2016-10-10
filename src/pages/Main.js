import React from 'react';
import { Link } from "react-router";

export default class Main extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to the Ultimate To Do List Manager by Daniel Otal</h1>
				<Link to="lists"><button>Enter</button></Link>
			</div>
		);
	}
}