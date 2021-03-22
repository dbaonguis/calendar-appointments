import React from 'react';
import { Card, CardActionArea, Typography, Tooltip } from '@material-ui/core';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Color } from './../../utils/colors';
import { ReminderParamsProp } from './../../redux/actions';
import { getRawAndFormattedTime } from './../../utils/dateUtils';

const styles = (theme: Theme) => createStyles({
	card: {
		paddingTop: theme.spacing.unit/2,
    paddingBottom: theme.spacing.unit/2,
    paddingLeft: theme.spacing.unit/2,
    paddingRight: theme.spacing.unit/2,
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

  const { rawTime, formattedTime } = getRawAndFormattedTime(Object.keys(reminderObj)[0]);

  const remindersPerTime = reminderObj[rawTime];
    
  // 12, 6, 4
  const colSpan = remindersPerTime.length > 3 ? 12 as GridSize : (12 / remindersPerTime.length) as GridSize;
  
  return (
    <Grid container spacing={0}>
      {remindersPerTime.length > 3 && (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
              onReminderClick({ 
                time: rawTime,
                dateObj: { date: remindersPerTime[0].dateTime }
              });
            }}>
              <Typography>
                {`[${formattedTime}] ${remindersPerTime.length} reminders here, click for details.`}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      )}
      {remindersPerTime.length <= 3 && remindersPerTime.map((reminder: ReminderProp) => (
        <Grid key={reminder.id} item xs={colSpan}>
          <Card className={classes.card} style={{backgroundColor: reminder.color.background}}>
            <CardActionArea onClick={(evt) => {
              evt.stopPropagation();
            
              onReminderClick({ 
                id: reminder.id,
                dateObj: { date: reminder.dateTime }
              });
            }}>
              <Tooltip title={
                <Typography color='inherit' variant='body1'>{`[${formattedTime}] ${reminder.message}`}</Typography>
              } placement='top-start'>
                <Typography noWrap={true} style={{color: reminder.color.text}}>
                  {`[${formattedTime}] ${reminder.message}`}
                </Typography>
              </Tooltip>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles( styles )( Reminder );

