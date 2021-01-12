import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

function Loops() {
  const classes = useStyles();

  return (
    <Container className={classes.main} maxWidth="lg">
      Loops
    </Container>
  );
}

export default Loops;