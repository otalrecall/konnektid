import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
			<thead>
				<tr>
					<th>{this.props.text}</th>
					<th>Options</th>
				</tr>
			</thead>
		);
	}
}