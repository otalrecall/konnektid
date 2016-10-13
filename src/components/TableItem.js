import React from 'react';
import ToDoStore from '../stores/ToDoStore';

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
			checked: ToDoStore.isTaskCompleted(this.props.id)
		};
	}

	check() {
		this.state.checked = !this.state.checked;
		this.props.setCompletedTask(this.props.id, this.state.checked);
	}

	renderTitleSection() {
		const { title } = this.props;

		const titleStyle = {
			cursor: 'pointer'
		};

		if (this.state.isEditing) {
			return(
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type="text" defaultValue={title} ref="editInput" />
					</form>
				</td>
			);
		}

		
		if (!this.props.isList && this.props.filterType == 'ALL_FILTER') {
			return (
				<td> 
					<input type="checkbox" onChange={this.check.bind(this)} checked={this.state.checked}/>
					<label style={titleStyle} onClick={this.onTitleClick.bind(this)}>
				
					{title}

					</label>
				</td>
			)
		} else {
			return (
				<td> 
					<label style={titleStyle} onClick={this.onTitleClick.bind(this)}>
				
					{title}

					</label>
				</td>
			)
		}
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return(
				<td>
					<button onClick={this.onSaveClick.bind(this)}>Save</button>
					<button onClick={this.onCancelClick.bind(this)}>Cancel</button>
				</td>
			);
		} 
		return (
			<td>
				<button onClick={this.onEditClick.bind(this)}>Edit</button>
				<button onClick={this.props.deleteItem.bind(this, this.props.id)}>Delete</button>
			</td>
		);
	}

	render() {
		return (
			<tr>
				{this.renderTitleSection()}
				{this.renderActionSection()}
			</tr>
		);
	}

	onTitleClick() {
		if (this.props.isList) {
			this.props.history.push(`/list/${this.props.id}`);
		} else {
			this.props.history.push(`/task/${this.props.id}`);
		}
	}

	onEditClick() {
		this.setState( { isEditing: true } );
	}

	onCancelClick() {
		this.setState( { isEditing: false } );
	}

	onSaveClick() {
		event.preventDefault();

		const id = this.props.id;
		const newTitle = this.refs.editInput.value;
		this.props.updateItem(id, newTitle);
		this.setState( { isEditing: false });
	}
}

