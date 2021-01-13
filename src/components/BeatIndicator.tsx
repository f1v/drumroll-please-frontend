import React, {
  // useContext
} from 'react';
// import classnames from 'classnames';
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
// import { SchedulerContext } from '../context/SchedulerContext';

function BeatIndicator() {
  // // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  // const [state, dispatch] = useContext(SchedulerContext);
  const useStyles = makeStyles((theme: Theme) => ({
    container: {
      position: 'relative',
      padding: '20px 0',
    },
    card: {
      width: '6.25%',
      position: 'relative',
    },
    indicator: {
      backgroundColor: '#fff',
      height: 0,
      paddingBottom: '25%',
      width: '100%',
    },
    active: {
      backgroundColor: '#b5d3e7',
    }
  }));
  const classes = useStyles();

  return (
    <Container id='beat-indicator' className={classes.container}>
      <Grid container spacing={1}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) => (
          <Grid key={value} item className={classes.card}>
            <Paper id={`indicator-${value}`} className={classes.indicator}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default BeatIndicator;