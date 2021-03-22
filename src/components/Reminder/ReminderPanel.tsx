import React from 'react';
import { Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as dateFns from 'date-fns';
import { ReminderProp } from './Reminder';
import { organizeReminderList } from './../../utils/reminder';
import { getRawAndFormattedTime } from './../../utils/dateUtils';


const styles = (theme: Theme) => createStyles({
	typo: {
		marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
	}
});

interface Props extends WithStyles<typeof styles>{
  viewReminder?: {
		id: string,
		time: string,
	};
  agendaStatus?: {
		isOpen: boolean,
		date: Date
	};
  reminderList?: ReminderProp[];
}

const ReminderPanel = (props: Props) => {
  const { agendaStatus, viewReminder, reminderList, classes } = props;

  //console.log('agendaStatus', agendaStatus);
  //console.log('viewReminder', viewReminder);
  //console.log('reminderList', reminderList);

  let filteredReminderList = null;
  if (viewReminder && viewReminder.id) {
    filteredReminderList = reminderList.filter((reminder: ReminderProp) => (
      reminder.id === viewReminder.id
    ));
  } else if (viewReminder && viewReminder.time) {
    filteredReminderList = reminderList.filter((reminder: ReminderProp) => (
      reminder.time === viewReminder.time
    ));
  } else if (reminderList && reminderList.length > 0) {
    filteredReminderList = reminderList.filter((reminder: ReminderProp) => (
      reminder.date === dateFns.format(agendaStatus.date, 'yyyy-MM-dd')
    ));
  }

  const reminderObjList = organizeReminderList(filteredReminderList, agendaStatus.date);

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {reminderObjList && reminderObjList.map((reminderObj, _idx) => {
          const { rawTime, formattedTime } = getRawAndFormattedTime(Object.keys(reminderObj)[0]);
          return (
            <ExpansionPanel key={_idx} defaultExpanded={_idx === 0}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{formattedTime}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container >
                  {reminderObj[rawTime].map((reminder: ReminderProp, idx: number) => (
                    <Grid item xs={12} style={{backgroundColor: reminder.color.background}} key={idx}>
                      <Typography className={classes.typo} style={{color: reminder.color.text}}>
                        {reminder.message}
                      </Typography>
                      {idx !== (reminderObj[rawTime].length - 1) && <Divider variant='fullWidth' />}
                    </Grid>
                  ))}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default withStyles( styles )( ReminderPanel );

