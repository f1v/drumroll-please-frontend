import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Sequencer from '../components/Sequencer';
import { SchedulerContextProvider } from '../context/SchedulerContext';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));


function Home() {
  const classes = useStyles();

  return (
    <SchedulerContextProvider>
      <Container component="main" className={classes.main} maxWidth="lg">
        <Sequencer />
      </Container>
      </SchedulerContextProvider>
  );
}

export default Home;