import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { v4 as uuidv4 } from 'uuid';
import { format as dateFormat } from 'date-fns';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Color } from './../../utils/colors';

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

export interface ReminderProp {
  id: string;
  date: string;
  time: string;
  dateTime: Date;
  message: string;
  color: Color;
}

interface Props {
  reminderObj: any;
}

const Reminder = (props: Props) => {

  const { reminderObj } = props;

  const rawTime = Object.keys(reminderObj)[0];
  let formattedTime = rawTime.split('_')[1];
  formattedTime = `${formattedTime} ${rawTime.split('_')[0]}`;

  const remindersPerTime = reminderObj[rawTime];
    
  // 12, 6, 4
  const colSpan = remindersPerTime.length > 3 ? 12 as GridSize : (12 / remindersPerTime.length) as GridSize;
  
  return (
    <Grid container spacing={0}>
      {remindersPerTime.length > 3 && (
        <Grid item xs={12}>
          <Card>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              //alert('hey!');
            }}>
              3+ reminders, click for details.
            </CardActionArea>
          </Card>
        </Grid>
      )}
      {remindersPerTime.length <= 3 && remindersPerTime.map((reminder: ReminderProp) => (
        <Grid item xs={colSpan}>
          <Card>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              // alert('ey!');
            }}>
              {reminder.message}
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles( styles )( Reminder );

