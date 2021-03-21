import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Color } from './../../utils/colors';

const styles = (theme: Theme) => createStyles({
	card: {
		backgroundColor: 'red',
	}
});

interface Props extends WithStyles<typeof styles>{
  // reminderObj: any;
}

const ReminderPanel = (props: Props) => {

  return (
    <Grid container spacing={0}>
      <Grid item>

      </Grid>
    </Grid>
  );
}

export default withStyles( styles )( ReminderPanel );

