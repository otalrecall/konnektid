import React from 'react';
import { Link } from "react-router";

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false
		};
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

		return (
			<td> 
			<label style={titleStyle} onClick={this.onTitleClick.bind(this)}>
			
			{title}

			</label>
			</td>
		)
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

