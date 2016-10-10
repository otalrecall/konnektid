import React from 'react';
import Table from '../components/Table';
import CreateToDo from '../components/createtodo';
import ToDoStore from '../stores/ToDoStore';
import * as ToDoActions from 'actions/ToDoActions';

export default class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: ToDoStore.getLists()
		};
	}

	componentWillMount() {
		ToDoStore.on("change", () => {
			this.getLists()
		})
	}

	componentWillUnmount() {
		ToDoStore.removeListener("change", this.getLists());
	}

	getLists() {
		this.setState({
			lists: ToDoStore.getLists()
		});
	}

	render() {
		return (
			<div>
				<h1>To Do Lists</h1>
				<CreateToDo todos={this.state.lists} createList={this.createList.bind(this)} />
				<Table 
					headerText="List"
					todos={this.state.lists}
					toggleTask={this.toggleTask.bind(this)}
					updateList={this.updateList.bind(this)}
					deleteList={this.deleteList.bind(this)}
				/>
			</div>
		);
	}


	toggleTask(task) {
		const foundTodo = _.find(this.state.lists, list => list.title === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({ lists: this.state.lists });
	}

	createList(text) {
		ToDoActions.createList(text);
	}

	updateList(oldTitle, newTitle) {
		ToDoActions.updateList(oldTitle, newTitle);
	}

	deleteList(id) {
		ToDoActions.deleteList(id);
	}
}