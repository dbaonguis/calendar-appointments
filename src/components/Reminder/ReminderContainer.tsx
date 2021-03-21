import { connect } from 'react-redux';
import Reminder from './Reminder';

interface Props {

}

interface State {

}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps };
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		
	};
}

const ReminderContainer = connect( mapStateToProps, mapDispatchToProps )( Reminder );

export default ReminderContainer;
