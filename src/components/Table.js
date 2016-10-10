import _ from 'lodash';
import React from 'react';
import Header from './Header';
import ListItem from './ListItem';

export default class Table extends React.Component {
	renderItems() {
		const props = _.omit(this.props, 'todos');

		return _.map(this.props.todos, (todo, index) => <ListItem key={index} 
			{...todo} {...props} />);
	}

	render() {
		return (
			<table>
				<Header text={this.props.headerText}/>
				<tbody>
					{this.renderItems()}
				</tbody>
			</table>
		);
	}
}