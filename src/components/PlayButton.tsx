import React from 'react';
import audioCtx from '../utils/audioContext';

import {
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import { SchedulerContext } from '../context/SchedulerContext';
import {
  resetCounters,
  scheduler,
  stop,
 } from '../utils/scheduler';

const useStyles = makeStyles((theme: Theme) => ({

}));

function PlayButton() {
  const classes = useStyles();
  // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  const [state, dispatch] = React.useContext(SchedulerContext);
  const handlePlayClick = () => {
    if (!state.isPlaying) {
      resetCounters();
      audioCtx.state === 'suspended' && audioCtx.resume();
      scheduler();
    } else {
      stop();
    }
    dispatch({
      type: 'PLAY_STOP',
    })
  };

  return (
      <Button
        variant="contained"
        color="primary"
        endIcon={state.isPlaying ? (
          <Icon>stop</Icon>
        ) : (
            <Icon>play_arrow</Icon>
          )
        }
        onClick={handlePlayClick}
      >
        {state.isPlaying ? (
          'Stop'
        ) : (
            'Play'
          )}
      </Button>
  );
}

export default PlayButton;