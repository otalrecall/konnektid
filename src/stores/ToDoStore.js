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
				},
				{
					id: Date.now()+3,
					title: 'Make new friends',
					description: 'Go to the street to meet people',
					isCompleted: true
				}
				]
			},
			{
				id: Date.now()+4,
				title: 'Stuff for 2017',	
				tasks: []
			}
		];
	}

	getLists() {
		return this.lists;
	}

	getListTitle(id) {
		const list = _.find(this.lists, list => list.id === parseInt(id, 10));
		return list.title;
	}

	getTasks(id) {
		const list = _.find(this.lists, list => list.id === parseInt(id, 10));
		return list.tasks;
	}

	getTask(id) {
		for (var i in this.lists) {
			const task = _.find(this.lists[i].tasks, task => task.id === parseInt(id, 10));
			if (task) {
				return task;
			}
		}
		return null;
	}

	getFilteredTasks(idList, filterType) {
		switch (filterType) {
			case "ALL_FILTER": {
				return this.getTasks(idList);
			}
			case "COMPLETED_FILTER": {
				const list = _.find(this.lists, list => list.id === parseInt(idList, 10));
				return _.filter(list.tasks, task => task.isCompleted === true);
			}
			case "ACTIVE_FILTER": {
				const list = _.find(this.lists, list => list.id === parseInt(idList, 10));
				return _.filter(list.tasks, task => task.isCompleted === false);
			}
		}
	}

	isTaskCompleted(id) {
		const task = this.getTask(id);
		if (task) {
			return task.isCompleted;
		}
		return null;
	}

	createList(text) {
		this.lists.push({
			id: Date.now(),
			title: text,
			tasks: []
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
		const list = _.find(this.lists, list => list.id === parseInt(idList, 10));
		list.tasks.push({
			id: Date.now(),
			title: textTask,
			description: '',
			isCompleted: false
		});
		this.emit("changeTasks");
	}

	deleteTask(idList, idTask) {
		const list = _.find(this.lists, list => list.id === parseInt(idList, 10));
		_.remove(list.tasks, task => task.id === idTask);
		this.emit("changeTasks");
	}

	updateTaskTitle(idList, idTask, newText) {
		const list = _.find(this.lists, list => list.id === parseInt(idList, 10));
		const task = _.find(list.tasks, task => task.id === parseInt(idTask, 10));
		task.title = newText;
		this.emit("changeTasks");
	}

	updateTaskDescription(idTask, newDescription) {
		const task = this.getTask(idTask);
		task.description = newDescription;
		this.emit("changeTask");
	}

	setCompletedTask(idList, idTask, isCompleted) {
		const list = _.find(this.lists, list => list.id === parseInt(idList, 10));
		const task = _.find(list.tasks, task => task.id === parseInt(idTask, 10));
		task.isCompleted = isCompleted;
		this.emit("changeTasks");
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
			case "UPDATE_TASK_TITLE": {
				this.updateTaskTitle(action.idList, action.idTask, action.newText);
				break;
			}
			case "UPDATE_TASK_DESCRIPTION": {
				this.updateTaskDescription(action.idTask, action.newDescription);
				break;
			}
			case "SET_COMPLETED_TASK": {
				this.setCompletedTask(action.idList, action.idTask, action.isCompleted);
				break;
			}
		}
	}
}

const toDoStore = new ToDoStore;
dispatcher.register(toDoStore.handleActions.bind(toDoStore));
window.dispatcher = dispatcher;

export default toDoStore;