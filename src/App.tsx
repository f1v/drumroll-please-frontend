import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';

import Home from './pages/Home';
import Loops from './pages/Loops';
import Sequencer from './components/Sequencer';
import { SchedulerContextProvider } from './context/SchedulerContext';
import Icon from '@material-ui/core/Icon';

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
  active: {
    color: '#fff',
  },
  navBarLink: {
    color: '#BDBDBD',
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <SchedulerContextProvider>
      <Router>
        <div className={classes.root}>
          <Container component="main" className={classes.main} maxWidth="lg">
            <AppBar position="static">
              <Toolbar>
              <NavLink activeClassName={classes.active} className={classes.navBarLink} exact to="/">
                <Button color="inherit" className={classes.menuButton}>
                  Home
                </Button>
              </NavLink>
              <NavLink activeClassName={classes.active} className={classes.navBarLink} to="/loops">
                <Button color="inherit" className={classes.menuButton}>
                  Loops
                </Button>
              </NavLink>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/loops" exact component={Loops} />
              <Route path="/loops/:id" component={Sequencer} />
            </Switch>
          </Container>
        </div>
      </Router>
    </SchedulerContextProvider>
  );
}

export default App;
