import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  instrumentContainer: {
    border: 'solid black 2px',
    height: '100px',
    width: '100px'
  }
}));

declare type Props = {
  instrument: string
}
function InstrumentDisplay({ instrument }: Props) {
  const classes = useStyles()
  return (
    <Container className={classes.instrumentContainer}>
      Instrument: {instrument}
    </Container>
  )
}

export default InstrumentDisplay