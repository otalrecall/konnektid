import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ToDoStore extends EventEmitter {
	constructor() {
		super();
		this.lists = [
			{
				id: Date.now(),
				title: 'Things to do on Friday',
				description: 'On Friday 12/10/2016',
				isCompleted: false,
				tasks: [{
					id: Date.now()+1,
					title: 'Go to the doctor',
					description: 'At 17:00',
					isCompleted: false
				},
				{
					id: Date.now()+2,
					title: 'Return the book to the library',
					description: 'I have to return the Bible to the uni library',
					isCompleted: true
				}
				]
			},
			{
				id: Date.now()+3,
				title: 'Stuff for 2017',
				isCompleted: true
			}
		];
	}

	getLists() {
		return this.lists;
	}

	createList(text) {
		this.lists.push({
			id: Date.now(),
			title: text,
			isCompleted: false
		});
		this.emit("change");
	}

	deleteList(id) {
		_.remove(this.lists, list => list.id === id);
		this.emit("change");
	}

	updateList(id, newText) {
		const listToEdit = _.find(this.lists, list => list.id === id);
		listToEdit.title = newText;
		this.emit("change");
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_LIST": {
				this.createList(action.text);
				break;
			}
			case "DELETE_LIST": {
				this.deleteList(action.id);
				break;
			}
			case "UPDATE_LIST": {
				this.updateList(action.id, action.newText);
				break;
			}
		}
	}
}

const toDoStore = new ToDoStore;
dispatcher.register(toDoStore.handleActions.bind(toDoStore));
window.dispatcher = dispatcher;

export default toDoStore;