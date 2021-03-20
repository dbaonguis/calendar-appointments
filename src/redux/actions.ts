// action types
export const OPEN_AGENDA = 'OPEN_AGENDA';
export const CLOSE_AGENDA = 'CLOSE_AGENDA';
export const OPEN_ADD_REMINDER = 'OPEN_ADD_REMINDER';
export const CLOSE_ADD_REMINDER = 'CLOSE_ADD_REMINDER';

export const CREATE_REMINDER_REQUEST = 'CREATE_REMINDER_REQUEST';
export const CREATE_REMINDER_SUCCESS = 'CREATE_REMINDER_SUCCESS';
export const CREATE_REMINDER_FAIL = 'CREATE_REMINDER_FAIL';

export const UPDATE_REMINDER_REQUEST = 'UPDATE_REMINDER_REQUEST';
export const UPDATE_REMINDER_SUCCESS = 'UPDATE_REMINDER_SUCCESS';
export const UPDATE_REMINDER_FAIL = 'UPDATE_REMINDER_FAIL';

export const DELETE_REMINDER_REQUEST = 'DELETE_REMINDER_REQUEST';
export const DELETE_REMINDER_SUCCESS = 'DELETE_REMINDER_SUCCESS';
export const DELETE_REMINDER_FAIL = 'DELETE_REMINDER_FAIL';

interface DateObj {
	date: Date
}

interface Reminder {
	date: Date;
}

// action creators
export function openAgenda( dateObj: DateObj ) {
	return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
	return { type: CLOSE_AGENDA };
}

export function openAddReminder( reminder?: any ) {
	return { type: OPEN_ADD_REMINDER, reminder };
}

export function closeAddReminder() {
	return { type: CLOSE_ADD_REMINDER };
}

export function createReminderRequest() {
	return { type: CREATE_REMINDER_REQUEST };
}

export function createReminderSuccess(reminder: any) {
	return { 
		type: CREATE_REMINDER_SUCCESS,
		payload: reminder
	};
}