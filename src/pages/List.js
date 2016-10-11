import React from 'react';

export default class Main extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.params.id}</h1>
			</div>
		);
	}
}