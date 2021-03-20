import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import { addMinutes, format as dateFormat } from 'date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	textField: {
		marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void
}

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose } = props;

	// const dateFns = new DateFnsUtils();

	const [message, setMessage] = useState<string>('');
	const [dateTime, setDateTime] = useState<Date>(new Date());
	// const [dateTime, setDateTime] = useState<Date>(dateFns.setMinutes(new Date(), 0));
		
	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				Add Reminder
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addReminderFormContainer }>
				<Typography>
					{dateFormat(dateTime, 'yyyy-MM-dd HH:MM:SS')}
				</Typography>
				<TextField
         	id='message'
         	label='Message'
         	multiline
         	rows='3'
         	margin='normal'
					className={classes.textField}
					variant='filled'
					value={message}
					onChange={(evt) => {
						setMessage(evt.target.value);
					}}
       	/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
       		<Grid container justify="space-around">
         		<DatePicker
							margin="normal"
           		label="Date picker"
							value={dateTime}
							onChange={(date) => {
								setDateTime(date);
							}}
							variant='filled'
         		/>
         		<TimePicker
           		margin="normal"
           		label="Time picker"
							value={dateTime}
							ampm={true}
							onChange={(date) => {
								setDateTime(date);
							}}
							variant='filled'
							minutesStep={5}
							onClickCapture={(evt) => {
								// addjust the time forward
								let tempDate = addMinutes(dateTime, 10);
								let tempMinute = tempDate.getMinutes() % 5;
								tempMinute = tempMinute > 0 ? 5 - tempMinute : 0;
								tempDate = addMinutes(tempDate, tempMinute);
								setDateTime(tempDate);
							}}
							onDismiss={() => {
								// reset the time
								setDateTime(new Date());
							}}
         		/>
       		</Grid>
				</MuiPickersUtilsProvider>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
