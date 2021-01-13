import React from 'react';

import {
  makeStyles,
  Theme,
} from '@material-ui/core';

declare type Props = {
  beat: string,
  isChecked: boolean,
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}



function Pad({ beat, isChecked, handleClick }: Props) {
  const useStyles = makeStyles((theme: Theme) => ({
    pad: {
      height: '4vw',
      width: '4vw',
      backgroundColor: isChecked ? 'blue' : 'none',
      border: 'solid blue 1px',
      margin: '3px'
    }
  }));
  const classes = useStyles()

  return (
    <div className={classes.pad} onClick={handleClick} id={beat}>

    </div>
  )
}

export default Pad