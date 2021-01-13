import React from 'react';
import { Link } from 'react-router-dom'
import {
  Container,
  makeStyles,
  Theme,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));


function Home() {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.main} maxWidth="lg">
      <h1>Drumroll Please</h1>
      <Link to='/loops'>
        <div>
          <img 
            src={'home-image.png'}
            width="90%"
          />
        </div>
      </Link>
      <Link to="/loops">
        <Button
          variant="contained"
          color="primary"
        >
          Get Started
        </Button> 
      </Link>
    </Container>
  );
}

export default Home;