import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes, format as dateFormat } from 'date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TwitterPicker, GithubPicker } from 'react-color';

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
	messageTextField: {
		marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'auto',
	},
	colorTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
		width: '150px'
  },
	dateTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
		width: '180px'
  },
	timeTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
		width: '150px'
  },
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void,
	onCreateReminderRequest: () => void,
	onCreateReminderSuccess: (reminder: any) => void,
}

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose, onCreateReminderRequest, onCreateReminderSuccess } = props;

	const [message, setMessage] = useState<string>('');
	const [dateTime, setDateTime] = useState<Date>(new Date());
	// const [textColor, setTextColor] = useState<string>('#000000');
	const [bgColor, setBgColor] = useState<string>('#FFFFFF');

	const onSaveHandler = () => {
		onCreateReminderRequest();
		onCreateReminderSuccess({
			id: uuidv4(),
			date: dateFormat(dateTime, 'yyyy-MM-dd'),
			time: dateFormat(dateTime, 'hh:mmb'),
			dateTime,
      message,
      color: '#FFFFFF',
		});
		onClose();
	}

	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='sm'
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
					className={classes.messageTextField}
					variant='filled'
					value={message}
					onChange={(evt) => {
						setMessage(evt.target.value);
					}}
       	/>
				<Grid container justify='space-between'>
					<Grid item>
						<TextField
							label="Background Color"
							className={classes.colorTextField}
							value={'test'}
							onChange={() => {}}
							margin="normal"
							variant="filled"
						/>
					</Grid>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid item>
							<DatePicker
								margin="normal"
								label="Date"
								value={dateTime}
								onChange={(date) => {
									setDateTime(date);
								}}
								variant='filled'
								className={classes.dateTextField}
							/>
						</Grid>
						<Grid item>
							<TimePicker
								margin="normal"
								label="Time"
								value={dateTime}
								ampm={true}
								onChange={(date) => {
									setDateTime(date);
								}}
								className={classes.timeTextField}
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
       	</Grid>
				<GithubPicker />
				<Button onClick={onSaveHandler}>Save</Button>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
