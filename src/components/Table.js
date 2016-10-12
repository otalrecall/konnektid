import _ from 'lodash';
import React from 'react';
import Header from './Header';
import TableItem from './TableItem';

export default class Table extends React.Component {
	renderItems() {
		const props = _.omit(this.props, 'table');
		return _.map(this.props.table, (elem, index) => <TableItem key={index} 
			{...elem} {...props} />);
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