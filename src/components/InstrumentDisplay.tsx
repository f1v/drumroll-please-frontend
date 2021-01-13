import React from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  instrumentContainer: {
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
    <div className={classes.instrumentContainer}>
      Instrument: {instrument}
    </div>
  )
}

export default InstrumentDisplay