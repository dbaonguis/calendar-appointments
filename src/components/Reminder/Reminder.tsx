import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Color } from './../../utils/colors';
import { ReminderParamsProp } from './../../redux/actions';

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

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
  reminderObj: any;
  onReminderClick: (reminderParams: ReminderParamsProp) => void;
}

const Reminder = (props: Props) => {

  const { classes, reminderObj, onReminderClick } = props;

  const rawTime = Object.keys(reminderObj)[0];
  let formattedTime = rawTime.split('_')[1];
  formattedTime = `${formattedTime} ${rawTime.split('_')[0]}`;
  formattedTime = formattedTime.startsWith('0') ? formattedTime.substring(1, formattedTime.length) : formattedTime;

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

              onReminderClick({ 
                time: rawTime,
                dateObj: { date: remindersPerTime[0].dateTime }
              });
            }}>
              {`[${formattedTime}] ${remindersPerTime.length} reminders here, click for details.`}
            </CardActionArea>
          </Card>
        </Grid>
      )}
      {remindersPerTime.length <= 3 && remindersPerTime.map((reminder: ReminderProp) => (
        <Grid key={reminder.id} item xs={colSpan}>
          <Card className={classes.card} style={{backgroundColor: reminder.color.background, color: reminder.color.text}}>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              onReminderClick({ 
                id: reminder.id,
                dateObj: { date: reminder.dateTime }
              });
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

