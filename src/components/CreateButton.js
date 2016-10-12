import React from 'react';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" ref="createInput" />
                <button>Add</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const title = createInput.value;
        const validateInput = this.validateInput(title);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });

        this.props.createItem(title);
        this.refs.createInput.value = '';
    }

    validateInput(title) {
        if (!title) {
            return 'Please enter a list.';
        } else {
            return null;
        }
    }
}