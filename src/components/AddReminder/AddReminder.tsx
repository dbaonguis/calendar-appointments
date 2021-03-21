import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes, format as dateFormat } from 'date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GithubPicker } from 'react-color';
import { contrastColors, Color } from './../../utils/colors';

const styles = (theme: Theme) => createStyles({
	palette: {
		primary: 'green'
	},
	addReminderFormContainer: {
		minHeight: '320px',
		height: '320px',
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
		width: '140px'
  },
	dateTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
		width: '160px'
  },
	timeTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
		width: '120px'
  },
	paperColorDisplay: {
		marginTop: '7px',
		height: '53px',
		width: '70px',
		display: 'flex',
		justifyContent: 'center',
  	alignItems: 'center',
		backgroundColor: red[600],
		color: 'white'
	},
	saveButton: {
		margin: theme.spacing.unit,
		marginTop: 'auto',
		backgroundColor: green[600],
		color: '#FFF',
		'&:hover': {
			backgroundColor: green[800]
		}
	},
	errorMessage: {
		marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
		color: 'red'
	}
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
	const [isColorPicker, setColorPicker] = useState<boolean>(false);
	const [bgColor, setBgColor] = useState<string>('#FFFFFF');
	const [textColor, setTextColor] = useState<string>('#000000');
	const [errorMessage, setErrorMessage] = useState<string|null>(null);

	useEffect(() => {
		if (isOpen) {
			resetForm();

		}
	}, [isOpen]);

	const onSaveHandler = () => {
		// validation
		if (!message.trim()) {
			setErrorMessage('Message is a required field.')
			return;
		}

		onCreateReminderRequest();
		onCreateReminderSuccess({
			id: uuidv4(),
			date: dateFormat(dateTime, 'yyyy-MM-dd'),
			time: dateFormat(dateTime, 'hh:mmb'),
			dateTime,
      message,
      color: {
				background: bgColor,
				text: textColor
			}
		});
		onClose();
	}

	const onColorChangeCompleteHandler = (color, evt) => {
		const selectedColor = String(color.hex).toUpperCase();
		const contrastedColor: Color = contrastColors(selectedColor);
		setBgColor(contrastedColor.background);
		setTextColor(contrastedColor.text);
		setColorPicker(false);
	}

	const hideColorPicker = () => {
		if (isColorPicker) {
			setColorPicker(false);
		}
	}

	const resetForm = () => {
		setMessage('');
		setDateTime(new Date());
		setColorPicker(false);
		setBgColor('#FFFFFF');
		setTextColor('#000000');
		setErrorMessage(null);
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
						if (evt.target.value.trim().length > 0) {
							setErrorMessage(null);
						}
						setMessage(evt.target.value);
					}}
					onFocus={() => {
						hideColorPicker();
					}}
					inputProps={{ maxLength: 30 }}
       	/>
				{errorMessage && <Typography className={classes.errorMessage}>{errorMessage}</Typography>}
				<Grid container justify='space-between'>
					<Grid item>
						<Grid container alignItems='center' spacing={0}>
							<Grid item>
								<TextField
									label="Background Color"
									className={classes.colorTextField}
									value={bgColor}
									margin="normal"
									variant="filled"
									onFocus={() => {
										setErrorMessage(null);
										setColorPicker(true);
									}}
								/>
							</Grid>
							<Grid item>
								<Typography>
									<Paper className={classes.paperColorDisplay} style={{backgroundColor: bgColor, color: textColor}}>
										Preview
									</Paper>
								</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item>
								{isColorPicker && <GithubPicker onChangeComplete={onColorChangeCompleteHandler} /> }
							</Grid>
						</Grid>
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
								onFocus={() => {
									hideColorPicker();
								}}
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
								onFocus={() => {
									hideColorPicker();
								}}
							/>
						</Grid>
					</MuiPickersUtilsProvider>
       	</Grid>
				<Button variant='contained' className={classes.saveButton} onClick={onSaveHandler} onFocus={() => {
					hideColorPicker();
				}}>Save</Button>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
