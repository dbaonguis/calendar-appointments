import { connect } from 'react-redux';
import ReminderPanel from './ReminderPanel';

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

const ReminderPanelContainer = connect( mapStateToProps, null )( ReminderPanel );

export default ReminderPanelContainer;
