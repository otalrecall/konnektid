import React from 'react';

export default class Footer extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = { 
	    	checkedAll: true, 
	    	checkedActive: false, 
	    	checkedCompleted: false
	    };
  	}  

	showAll() {
		this.setState({
        	checkedAll: true,
        	checkedActive: false,
        	checkedCompleted: false     
    	})
		this.props.setFilterTask('ALL_FILTER');
	}

	showActive() {
		this.setState({
        	checkedAll: false,
        	checkedActive: true,
        	checkedCompleted: false      
    	})
		this.props.setFilterTask('ACTIVE_FILTER');
	}

	showCompleted() {
		this.setState({
        	checkedAll: false,
        	checkedActive: false,
        	checkedCompleted: true       
    	})
		this.props.setFilterTask('COMPLETED_FILTER');
	}

	render() {
		return (
			<div>
				<input type="radio" name="taskFilter" id="all" value="all" onChange={this.showAll.bind(this)} 
					checked={ this.state.checkedAll }/>
				<label htmlFor="always">All</label>

				<input type="radio" name="taskFilter" id="active" value="active" onChange={this.showActive.bind(this)}
					checked={ this.state.checkedActive }/>
				<label htmlFor="never">Active</label>

				<input type="radio" name="taskFilter" id="completed" value="completed" onChange={this.showCompleted.bind(this)}
					checked={ this.state.checkedCompleted }/>
				<label htmlFor="change">Completed</label>
			</div>
		);
	}


}