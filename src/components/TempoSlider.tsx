import React, { useContext, useCallback, useState } from 'react';
import _ from 'lodash';

import {
  Slider,
  makeStyles,
  Theme,
} from '@material-ui/core';

import { SchedulerContext } from '../context/SchedulerContext';

const useStyles = makeStyles((theme: Theme) => ({}));

function TempoSlider() {
  const classes = useStyles();
  // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  const [state, dispatch] = useContext(SchedulerContext);
  const [tempo, setTempo] = useState<number>(60);

  /**
   * Avoid overloading the scheduling logic with tempo changes
   */
  const debouncedTempoChange = useCallback(
		_.debounce(newTempo => {
      dispatch({
        type: 'TEMPO',
        payload: newTempo,
      })
    }, 500),
		[],
  );

  const handleTempoChange = (event: any, newValue: number | number[]) => {
    setTempo(newValue as number);
    debouncedTempoChange(newValue);
  };

  return (
    <Slider
    aria-labelledby="discrete-slider-small-steps"
    step={1}
    marks
    min={10}
    max={250}
    value={tempo}
    onChange={handleTempoChange}
    valueLabelDisplay="auto"
  />
  );
}

export default TempoSlider;