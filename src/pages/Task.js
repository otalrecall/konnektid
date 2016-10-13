import React from 'react';
import ToDoStore from '../stores/ToDoStore';
import * as ToDoActions from 'actions/ToDoActions';

export default class Task extends React.Component {
	constructor(props) {
		super(props);
		this.getTask = this.getTask.bind(this);
		this.state = {
			taskId: this.props.params.id,
			task: ToDoStore.getTask(this.props.params.id),
			isEditingDescription: false
		}
	}

	componentWillMount() {
		ToDoStore.on("changeTask", this.getTask)
	}

	componentWillUnmount() {
		ToDoStore.removeListener("changeTask", this.getTask)
	}

	getTask() {
		this.setState({
			task: ToDoStore.getTask(this.props.params.id)
		});
	}

	renderDescription() {
		if (!this.state.task.description || this.state.isEditingDescription) {
			return (
				<div>
					<form onSubmit={this.onSaveClick.bind(this)}>
		                <input placeholder="Description" defaultValue={this.state.task.description} ref="editDescriptionInput" />
		            	<button onClick={this.onSaveClick.bind(this)}>Save</button>
		            </form>
	            </div>
			)

		}
		else {
			return (
				<div>
					<label>{this.state.task.description}</label>
					<button onClick={this.onEditClick.bind(this)}>Edit</button>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<h1>{this.state.task.title}</h1>
				{this.renderDescription()}
			</div>
		)
	}

	onEditClick() {
		this.setState( { isEditingDescription: true } );
	}

	onCancelClick() {
		this.setState( { isEditingDescription: false } );
	}

	onSaveClick(event) {
		event.preventDefault();

		const newDescription = this.refs.editDescriptionInput.value;
		ToDoActions.updateTaskDescription(this.state.taskId, newDescription);
		this.setState( { isEditingDescription: false });
	}
}