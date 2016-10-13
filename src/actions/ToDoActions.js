import dispatcher from "../dispatcher";

export function createList(text) {
	dispatcher.dispatch({
		type: "CREATE_LIST",
		text
	});
}

export function deleteList(id) {
	dispatcher.dispatch({
		type: "DELETE_LIST",
		id
	});
}

export function updateList(id, newText) {
	dispatcher.dispatch({
		type: "UPDATE_TITLE_LIST",
		id,
		newText
	});
}

export function createTask(idList, textTask) {
	dispatcher.dispatch({
		type: "CREATE_TASK",
		idList,
		textTask
	});
}

export function updateTask(idList, idTask, newText) {
	dispatcher.dispatch({
		type: "UPDATE_TITLE_TASK",
		idList,
		idTask,
		newText
	});
}

export function setCompletedTask(idList, idTask, isCompleted) {
	dispatcher.dispatch({
		type: "SET_COMPLETED_TASK",
		idList,
		idTask,
		isCompleted
	});
}

export function deleteTask(idList, idTask) {
	dispatcher.dispatch({
		type: "DELETE_TASK",
		idList,
		idTask
	});
}