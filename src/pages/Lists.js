import React from 'react';
import Table from '../components/Table';
import CreateButton from '../components/CreateButton';
import ToDoStore from '../stores/ToDoStore';
import * as ToDoActions from 'actions/ToDoActions';

export default class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.getLists = this.getLists.bind(this);
		this.state = {
			lists: ToDoStore.getLists()
		};
	}

	componentWillMount() {
		ToDoStore.on("changeLists", this.getLists);
	}

	componentWillUnmount() {
		ToDoStore.removeListener("changeLists", this.getLists);
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
				<CreateButton lists={this.state.lists} createItem={this.createItem.bind(this)} />
				<Table 
					history={this.props.history}
					headerText="List"
					table={this.state.lists}
					updateItem={this.updateItem.bind(this)}
					deleteItem={this.deleteItem.bind(this)}
					isList={true}
				/>
			</div>
		);
	}

	createItem(text) {
		ToDoActions.createList(text);
	}

	updateItem(id, newTitle) {
		ToDoActions.updateList(id, newTitle);
	}

	deleteItem(id) {
		ToDoActions.deleteList(id);
	}
}