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
		type: "UPDATE_LIST",
		id,
		newText,
	});
}