import React from 'react';
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
      <a href='/loops'>
        <div>
          <img 
            src={'home-image.png'}
            width="90%"
          />
        </div>
      </a>
      <a href="/loops">
        <Button
          variant="contained"
          color="primary"
        >
          Get Started
        </Button> 
      </a>
    </Container>
  );
}

export default Home;