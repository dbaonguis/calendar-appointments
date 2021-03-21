import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, Card, ButtonBase, CardActionArea, CardContent } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate, format as formatDate } from 'date-fns';
import { ReminderProp } from './../Reminder/Reminder';
import ReminderContainer from './../Reminder/ReminderContainer';

const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '100%'
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	onDayClick: (dateObj: DateObj) => void,
	reminderList?: any | undefined
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, onDayClick, reminderList } = props;
	const [ focused, setFocused ] = useState(false)

	let reminders: ReminderProp[] = null;
	if (reminderList) {
		const selectedDate = formatDate(dateObj.date, 'yyyy-MM-dd');
		reminders = reminderList.filter(reminder => reminder.date === selectedDate);
		
		if (reminders.length > 0) {
			console.log('unsorted', reminders);
			// sort by time - asc
			const sortedReminders = reminders.sort((a, b) => (
				(a.time > b.time) ? 1 : (a.time < b.time) ? -1 : 0
			));

			// put into an array of objects
			const reminderObjList = [];
			sortedReminders.forEach((reminder) => {
				const objFound = reminderObjList.find((obj) => {
					return obj.hasOwnProperty(reminder.time);
				});
				
				if (!objFound) {
					const reminderObj = {
						[reminder.time]: [reminder]
					};
					reminderObjList.push(reminderObj);
				} else {
					reminderObjList.forEach((reminderObj) => {
						if (reminderObj[reminder.time]) {
							reminderObj[reminder.time] = [...objFound[reminder.time], reminder]
						}
					});
				}
			});

			console.log('reminderObjList', reminderObjList);
		}
	}

	

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;

	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)


	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( dateObj ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Grid container spacing={8}>
				<Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
					<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
				</Grid>
				<Grid item xs={8} sm={8} md={9} lg={10} xl={10}>
					<div className={ classes.remindersContainer }>
						{/* reminders go here */}
						{reminders && reminders.map(reminder => (
							<div>test</div>
						))}
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
