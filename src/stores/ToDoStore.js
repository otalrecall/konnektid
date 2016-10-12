import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ToDoStore extends EventEmitter {
	constructor() {
		super();
		this.lists = [
			{
				id: Date.now(),
				title: 'Things to do on Friday',
				tasks: [{
					id: Date.now()+1,
					title: 'Go to the doctor',
					description: 'At 17:00',
					isCompleted: true
				},
				{
					id: Date.now()+2,
					title: 'Hug my mum',
					description: 'I havent hug her for long',
					isCompleted: false
				}
				]
			},
			{
				id: Date.now()+3,
				title: 'Stuff for 2017'
			}
		];
	}

	getLists() {
		return this.lists;
	}

	getList(id) {
		const list = _.find(this.lists, list => list.id === parseInt(id, 10));
		return list;
	}

	createList(text) {
		this.lists.push({
			id: Date.now(),
			title: text
		});
		this.emit("changeLists");
	}

	deleteList(id) {
		_.remove(this.lists, list => list.id === id);
		this.emit("changeLists");
	}

	updateTitleList(id, newText) {
		const listToEdit = _.find(this.lists, list => list.id === id);
		listToEdit.title = newText;
		this.emit("changeLists");
	}

	createTask(idList, textTask) {
		const list = _.find(this.lists, list => list.id === idList);
		list.tasks.push({
			id: Date.now(),
			title: textTask,
			isCompleted: false
		});
		this.emit("changeList");
	}

	deleteTask(idList, idTask) {
		const list = _.find(this.lists, list => list.id === idList);
		_.remove(list.tasks, task => task.id === idTask);
		this.emit("changeList");
	}

	updateTitleTask(idList, idTask, newText) {
		const list = _.find(this.lists, list => list.id === idList);
		const task = _.find(list.tasks, task => task.id === idTask);
		task.title = newText;
		this.emit("changeList");
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
			case "UPDATE_TITLE_LIST": {
				this.updateTitleList(action.id, action.newText);
				break;
			}
			case "CREATE_TASK": {
				this.createTask(action.idList, action.textTask);
				break;
			}
			case "DELETE_TASK": {
				this.deleteTask(action.idList, action.idTask);
				break;
			}
			case "UPDATE_TITLE_TASK": {
				this.updateTitleTask(action.idList, action.idTask, action.newText);
				break;
			}
		}
	}
}

const toDoStore = new ToDoStore;
dispatcher.register(toDoStore.handleActions.bind(toDoStore));
window.dispatcher = dispatcher;

export default toDoStore;