import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';

import Home from './pages/Home';
import Loops from './pages/Loops';
import Sequencer from './components/Sequencer';
import { SchedulerContextProvider } from './context/SchedulerContext';
import Icon from '@material-ui/core/Icon';
import Recorder from './recorder/Recorder';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <SchedulerContextProvider>
      <Router>
        <div className={classes.root}>
          <Container component="main" className={classes.main} maxWidth="lg">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/loops" exact component={Loops} />
              <Route path="/loops/:id" component={Sequencer} />
            </Switch>
          </Container>
          <Recorder />
        </div>
      </Router>
    </SchedulerContextProvider>
  );
}

export default App;
