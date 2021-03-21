import { connect } from 'react-redux';
import Reminder from './Reminder';

interface Props {
  reminderObj: any;
}

interface State {

}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps };
}

/*
const mapDispatchToProps = (dispatch: any) => {
	return {
		
	};
}
*/

const ReminderContainer = connect( mapStateToProps, null )( Reminder );

export default ReminderContainer;
