import React from 'react';
import Table from '../components/Table';
import CreateButton from '../components/CreateButton';
import ToDoStore from '../stores/ToDoStore';
import * as ToDoActions from 'actions/ToDoActions';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: ToDoStore.getList(this.props.params.id)
		};
	}

	componentDidMount() {
		ToDoStore.on("changeList", () => {
			this.getList()
		})
	}

	componentWillUnmount() {
		ToDoStore.removeListener("changeList", () => {
			this.getList()
		})
	}

	getList() {
		this.setState({
			list: ToDoStore.getList(this.props.params.id)
		});
	}

	render() {
		return (
			<div>
				<h1>{this.state.list.title} Tasks</h1>
				<CreateButton list={this.state.list} createItem={this.createItem.bind(this)} />
				<Table 
					history={this.props.history}
					headerText="Task"
					table={this.state.list.tasks}
					updateItem={this.updateItem.bind(this)}
					deleteItem={this.deleteItem.bind(this)}
					isList={false}
				/>
			</div>
		);
	}

	createItem(text) {
		ToDoActions.createTask(this.state.list.id, text);
	}

	updateItem(idTask, newTitle) {
		ToDoActions.updateTask(this.state.list.id, idTask, newTitle);
	}

	deleteItem(idTask) {
		ToDoActions.deleteTask(this.state.list.id, idTask);
	}
}