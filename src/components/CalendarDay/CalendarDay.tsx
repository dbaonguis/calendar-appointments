import React, { useState } from 'react';
import { Avatar, Grid } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate } from 'date-fns';
import ReminderContainer from './../Reminder/ReminderContainer';
import { organizeReminderList } from './../../utils/reminder';

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

	const reminderObjList = organizeReminderList(reminderList, dateObj.date);
	
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
						{reminderObjList && reminderObjList.map((reminderObj: any, idx: number) => (
							<ReminderContainer key={idx} reminderObj={reminderObj} />
						))}
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
