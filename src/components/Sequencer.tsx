import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import audioCtx from '../utils/audioContext';
import { notesInQueue } from '../utils/scheduler';
import {
  CircularProgress,
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Module from '../components/Module'
import { getLoopSequence } from '../api/loop'
import PlayButton from './PlayButton';
import TempoSlider from './TempoSlider';
import { SchedulerContext } from '../context/SchedulerContext';
import CreateNewModule from './CreateNewModule'
import BeatIndicator from './BeatIndicator';
import { updateModule } from '../api/module'

declare type Props = {
  match: {
    params: {
      id: number
    }
  },
}

const useStyles = makeStyles((theme: Theme) => ({}));

function Sequencer({ match }: Props) {
  const classes = useStyles();
  const requestRef = useRef<number>(0);
  // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  const [state, dispatch] = useContext(SchedulerContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * requestAnimationFrame keeps track of beat count from the scheduler.
   * Does some housekeeping and dispatches to BEAT to update the beat in the provider store.
   */
  let lastNoteDrawn = 3;
  const beatProgressAnimation = () => {
    let drawNote = lastNoteDrawn;
    const currentTime = audioCtx.currentTime;
    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
      drawNote = notesInQueue[0].note;
      notesInQueue.splice(0, 1);   // remove note from queue
      dispatch({
        type: 'BEAT',
        payload: drawNote,
      })
    }
    // We only need to draw if the note has moved.
    if (lastNoteDrawn !== drawNote) {
      lastNoteDrawn = drawNote;
    }
    // set up to draw again
    requestRef.current = requestAnimationFrame(beatProgressAnimation);
  }

  const persistLoopUpdates = async () => {
    const modules = state.loop.modules;
    const promises = modules.map(async (module: any) => {
      const moduleRes = await updateModule(module)
      return moduleRes
    })
    const moduleResponses = await Promise.all(promises);
  }

  /**
   * Start/stop state tells us when to start animating.
   * We update the db when playing is stopped.
   */
  useEffect(() => {
    if (state.isPlaying) {
      requestAnimationFrame(beatProgressAnimation);
    } else {
      cancelAnimationFrame(requestRef.current);
      persistLoopUpdates();
    }
  }, [state.isPlaying]);


  useEffect(() => {
    loadData()
  }, [match.params.id])

  const loadData = async () => {
    const sequenceData = await getLoopSequence(match.params.id);
    if (sequenceData) {
      dispatch({
        type: 'FETCH_LOOP',
        payload: sequenceData,
      })
      setIsLoading(false);
    }
  }

  const createModules = (module: any, index: number) => (
    <Module
      key={index}
      loopId={match.params.id}
      moduleId={module.id}
    />
  )

  const modules = state.loop && state.loop.modules;
  return (
    <Container maxWidth="lg">
      {isLoading ? (
      <CircularProgress />
    ) : (
      <div>
        <div>Current Beat: {state.beat}</div>
        <PlayButton />
        <TempoSlider />
        Sequencer
        name: {state.loop.name}
        <BeatIndicator />
        {modules && modules.map(createModules)}
        <CreateNewModule loopId={match.params.id} reloadData={loadData}/>
      </div>
    )}
    </Container>
  );
}

export default Sequencer;