import { connect } from 'react-redux';
import Reminder from './Reminder';
import { viewReminderRequest, ReminderParamsProp, viewReminderSuccess, openAgenda } from './../../redux/actions';

interface Props {
  reminderObj: any;
}

interface State {

}

interface DateObj {
	date: Date
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps };
}


const mapDispatchToProps = (dispatch: any) => {
	return {
		onReminderClick: (reminderParams: ReminderParamsProp) => {
			dispatch( viewReminderRequest( reminderParams ) );
      dispatch( viewReminderSuccess() );
      dispatch( openAgenda( reminderParams.dateObj ) );
		}
	}
}

const ReminderContainer = connect( mapStateToProps, mapDispatchToProps )( Reminder );

export default ReminderContainer;
