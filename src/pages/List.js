import React from 'react';
import Table from '../components/Table';
import CreateButton from '../components/CreateButton';
import Footer from '../components/Footer';
import ToDoStore from '../stores/ToDoStore';
import * as ToDoActions from 'actions/ToDoActions';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listId: this.props.params.id,
			listTitle: ToDoStore.getListTitle(this.props.params.id),
			tasks: ToDoStore.getTasks(this.props.params.id),
			filterType: 'ALL_FILTER'
		};
	}

	componentDidMount() {
		ToDoStore.on("changeTasks", () => {
			this.filterTask(this.state.filterType);
		})
	}

	componentWillUnmount() {
		ToDoStore.removeListener("changeTasks", () => {
			this.filterTask(this.state.filterType)
		})
	}

	render() {
		return (
			<div>
				<h1>{this.state.listTitle} Tasks</h1>
				<CreateButton 
					createItem={this.createItem.bind(this)} 
				/>
				<Table 
					history={this.props.history}
					headerText="Task"
					table={this.state.tasks}
					updateItem={this.updateItem.bind(this)}
					deleteItem={this.deleteItem.bind(this)}
					setCompletedTask={this.setCompletedTask.bind(this)}
					isList={false}
					filterType={this.state.filterType}
				/>
				<Footer 
					filterTask={this.filterTask.bind(this)}
				/>
			</div>
		);
	}

	createItem(text) {
		ToDoActions.createTask(this.state.listId, text);
	}

	updateItem(idTask, newTitle) {
		ToDoActions.updateTask(this.state.listId, idTask, newTitle);
	}

	deleteItem(idTask) {
		ToDoActions.deleteTask(this.state.listId, idTask);
	}

	filterTask(filterType) {
		console.log(filterType);
		this.setState({
			tasks: ToDoStore.getFilteredTasks(this.props.params.id, filterType),
			filterType
		});
	}

	setCompletedTask(idTask, isCompleted) {
		console.log(isCompleted);
		ToDoActions.setCompletedTask(this.state.listId, idTask, isCompleted);
	}

}