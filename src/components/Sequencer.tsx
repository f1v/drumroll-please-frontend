import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import audioCtx from '../utils/audioContext';
import { notesInQueue } from '../utils/scheduler';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Module from '../components/Module'
import { getLoopSequence } from '../api/loop'
import { updateModule } from '../api/module';
<<<<<<< HEAD
import PlayButton from './PlayButton';
import TempoSlider from './TempoSlider';
import { SchedulerContext } from '../context/SchedulerContext';
=======
import CreateNewModule from './CreateNewModule'
>>>>>>> 0218ad5... WIP create new Module

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

  const [sequenceData, setSequenceData] = useState({
    name: '',
    id: null,
    modules: [],
  })
  const [shouldRefreshData, setShouldRefreshData] = useState(false)

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

  /**
   * Start/stop state tells us when to start animating
   */
  useEffect(() => {
    if (state.isPlaying) {
      requestAnimationFrame(beatProgressAnimation);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
  }, [state.isPlaying]);


  useEffect(() => {
    console.log('use effect')
    loadData()
  }, [match.params.id])

  const loadData = async () => {
    const sequenceData = await getLoopSequence(match.params.id)
    sequenceData && setSequenceData(sequenceData)
  }

  const setModule = () => {

  }

  const createModules = (module: any, index: number) => (
    <Module
      key={index}
      index={index}
      initialData={module}
      loopId={match.params.id}
      moduleId={module.id}
      onChange={setModule}
    />
  )

  const { modules } = sequenceData

  return (
    <Container maxWidth="lg">
      <div>Current Beat: {state.beat}</div>
      <PlayButton />
      <TempoSlider />
      Sequencer
      name: {sequenceData.name}
      {modules && modules.map(createModules)}
      <CreateNewModule />
    </Container>
  );
}

export default Sequencer;