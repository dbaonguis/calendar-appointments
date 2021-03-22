import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as dateFns from 'date-fns';
import ReminderPanelContainer from './../Reminder/ReminderPanelContainer';
import { ReminderProp } from './../Reminder/Reminder';

const styles = (theme: Theme) => createStyles({
	remindersContainer: {
		minHeight: '250px',
		marginTop: '10px'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	toolbarButtonHidden: {
		visibility: 'hidden'
	},
	toolbarButtonVisible: {
		visibility: 'visible'
	}
});

interface Props extends WithStyles<typeof styles>{
	agendaStatus: {
		isOpen: boolean,
		date: Date
	};
	viewReminder: {
		id: string,
		time: string,
	};
	reminderList: ReminderProp[];
	onClose: () => void;
}

const AgendaDay = (props: Props) => {
	const { classes, agendaStatus, viewReminder, reminderList, onClose } = props;
	const dateTitle = agendaStatus.date ? dateFns.format( agendaStatus.date, 'LLLL do, yyyy' ) : 'Closing'

	const dateFound = reminderList.length > 0 && reminderList.some((reminder: ReminderProp) => {
		if (agendaStatus.date) {
			return reminder.date === dateFns.format(agendaStatus.date, 'yyyy-MM-dd')
		}
		return false;
	});

	const emptyReminder = !viewReminder.id && !viewReminder.time && !dateFound;

	return (
		<Dialog
			open={ agendaStatus.isOpen }
			onClose={ onClose }
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='sm'
		>
			<DialogTitle id='form-dialog-title'>
				{ dateTitle }
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={ onClose }>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.remindersContainer }>
				{emptyReminder ? (
					<Typography>
						No agenda/reminders for this day.
					</Typography>
				) : (
					<ReminderPanelContainer />
				)}
			</DialogContent>
		</Dialog>
	);
}

export default withStyles( styles )( AgendaDay );
