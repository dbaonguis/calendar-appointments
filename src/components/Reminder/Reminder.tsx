import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import Grid, { GridSize } from '@material-ui/core/Grid';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Color } from './../../utils/colors';

const styles = (theme: Theme) => createStyles({
	card: {
		backgroundColor: 'red',
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

interface Props extends WithStyles<typeof styles>{
  reminderObj: any;
}

const Reminder = (props: Props) => {

  const { classes, reminderObj } = props;

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
              {`[${formattedTime}] ${remindersPerTime.length} reminders here, click for details.`}
            </CardActionArea>
          </Card>
        </Grid>
      )}
      {remindersPerTime.length <= 3 && remindersPerTime.map((reminder: ReminderProp) => (
        <Grid item xs={colSpan}>
          <Card className={classes.card} style={{backgroundColor: reminder.color.background, color: reminder.color.text}}>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              // alert('ey!');
            }}>
              {`[${formattedTime}] ${reminder.message}`}
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles( styles )( Reminder );

