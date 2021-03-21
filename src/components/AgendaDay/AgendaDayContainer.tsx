import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda, viewReminderReset } from '../../redux/actions';

interface Props {}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: Date
	}
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { agendaStatus } = state;

	return { agendaStatus };
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
