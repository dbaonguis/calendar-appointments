import { combineReducers } from 'redux';
import { 
	OPEN_AGENDA,
	CLOSE_AGENDA,
	OPEN_ADD_REMINDER,
	CLOSE_ADD_REMINDER,
	CREATE_REMINDER_REQUEST,
	CREATE_REMINDER_SUCCESS,
	UPDATE_REMINDER_REQUEST,
	DELETE_REMINDER_REQUEST,
	VIEW_REMINDER_REQUEST,
	VIEW_REMINDER_SUCCESS,
	VIEW_REMINDER_RESET,
} from './actions';

const initialAgendaState = {
	isOpen: false,
	date: null
}

const initialAddReminderState = {
	isOpen: false
}

const initialReminderList = []

const initialViewReminder = {
	id: null,
	time: null,
}

function agendaStatus( state = initialAgendaState , action: any ) {
	switch( action.type ) {
		case OPEN_AGENDA:
			return {
				isOpen: true,
				date: action.dateObj.date
			}
		case CLOSE_AGENDA:
			return {
				isOpen: false,
				date: null
			}
		default: return state
	}
}

function addReminderStatus( state = initialAddReminderState, action: any ) {
	switch( action.type ) {
		case OPEN_ADD_REMINDER:
			return {
				isOpen: true
			}
		case CLOSE_ADD_REMINDER:
			return {
				isOpen: false
			}
		default: return state
	}
}

function reminderList( state = initialReminderList, action: any ) {
	switch( action.type ) {
		case CREATE_REMINDER_REQUEST:
			return state;
		case CREATE_REMINDER_SUCCESS:
			return [
				...state,
				action.payload
			];
		case UPDATE_REMINDER_REQUEST:
			return {
				isOpen: false
			};
		case DELETE_REMINDER_REQUEST:
			return {
				isOpen: false
			}
		default: return state
	}
}

function viewReminder(state = initialViewReminder, action: any ) {
	switch (action.type) {
		case VIEW_REMINDER_REQUEST:
			return {
				...state,
				id: action.payload.id,
				time: action.payload.time
			};
		case VIEW_REMINDER_SUCCESS:
			return state;
		case VIEW_REMINDER_RESET:
			return initialViewReminder;
		default: 
			return state;
	}
}

const calendarAppReducer = combineReducers( {
	agendaStatus,
	addReminderStatus,
	reminderList,
	viewReminder,
} )

export default calendarAppReducer;
