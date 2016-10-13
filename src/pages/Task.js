import React from 'react';

export default class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskId: this.props.params.id
	}
	render() {
		return (
			<thead>
				<tr>
					<th>{this.state.taskId}</th>
				</tr>
			</thead>
		);
	}
}