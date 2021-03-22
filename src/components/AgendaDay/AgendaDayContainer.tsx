import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda, viewReminderReset } from '../../redux/actions';
import { ReminderProp } from './../Reminder/Reminder';

interface Props {}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: Date
	},
	viewReminder: {
		id: string,
		time: string,
	},
	reminderList: ReminderProp[]
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { agendaStatus, viewReminder, reminderList } = state;

	return { agendaStatus, viewReminder, reminderList };
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAgenda() );
			dispatch( viewReminderReset() );
		}
	}
}

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
