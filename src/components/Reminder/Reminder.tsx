import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { v4 as uuidv4 } from 'uuid';
import { format as dateFormat } from 'date-fns';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

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

interface Props {
	date: Date;
  time: string;
}

const Reminder = (props: Props) => {

  const sampleData = [
    {
      id: uuidv4(),
      date: dateFormat(new Date('1/2/2000'), 'yyyy-MM-dd'),
      time: '2:00pm',
      text: 'Reminder #1'
    },
    {
      id: uuidv4(),
      date: dateFormat(new Date(), 'yyyy-MM-dd'),
      time: '2:00pm',
      text: 'Reminder #2'
    },
    {
      id: uuidv4(),
      date: dateFormat(new Date(), 'yyyy-MM-dd'),
      time: '2:00pm',
      text: 'Reminder #3'
    },
    {
      id: uuidv4(),
      date: dateFormat(new Date(), 'yyyy-MM-dd'),
      time: '2:00pm',
      text: 'Reminder #4'
    },
  ];


  console.log(sampleData);

  // 12, 6, 4
  const colSpan = sampleData.length > 3 ? 12 as GridSize : (12 / sampleData.length) as GridSize;
  
  return (
    <Grid container spacing={0}>
      {sampleData.length > 3 && (
        <Grid item xs={12}>
          <Card>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              alert('hoy tarantado!');
            }}>
              3+ reminders, click for details.
            </CardActionArea>
          </Card>
        </Grid>
      )}
      {sampleData.length <= 3 && sampleData.map((reminder) => (
        <Grid item xs={colSpan}>
          <Card>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              alert('hoy tarantado!');
            }}>
              {reminder.text}
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles( styles )( Reminder );

