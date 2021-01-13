import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import _ from 'lodash';
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
import UpdateModulesButton from './UpdateModulesButton';
import Recorder from './Recorder';
import {
  setSamples,
  playKickSample,
  playSnareSample,
  playHiHatSample,
  playTomSample
 } from '../instruments';
import loadSamples from '../utils/loadSamples';
import { indexToBeatKeyMap } from '../helpers/beatMapping';

declare type Props = {
  match: {
    params: {
      id: number
    }
  },
}

const useStyles = makeStyles((theme: Theme) => ({}));
let beatFunction: any = null;
let loops: any = {
  modules: [],
};
function Sequencer({ match }: Props) {
  const classes = useStyles();
  const requestRef = useRef<number>(0);
  // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  const [state, dispatch] = useContext(SchedulerContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let groupedModules;

  const playAudioLogic = useCallback((currentNote: number, globalState: any) => {
    const currentBeat = indexToBeatKeyMap[currentNote];
    groupedModules = _.groupBy(globalState.modules, 'instrument');
    console.log(state.loop)
    if (groupedModules.bass && groupedModules.bass[0][currentBeat]) {
      playKickSample();
    }

    if (groupedModules['bass drum'] && groupedModules['bass drum'][0][currentBeat]) {
      playKickSample();
    }

    if (groupedModules['snare drum'] && groupedModules['snare drum'][0][currentBeat]) {
      playSnareSample();
    }
    if (groupedModules.cymbal && groupedModules.cymbal[0][currentBeat]) {
      playHiHatSample();
    }
    if (groupedModules.tom && groupedModules.tom[0][currentBeat]) {
      playTomSample();
    }
  }, [state]);
  /**
   * requestAnimationFrame keeps track of beat count from the scheduler to update current beat indicators.
   * Does some housekeeping and plays the correct audio samples.
   */
  let lastNoteDrawn = 3;
  beatFunction = beatFunction || (() => {
    let drawNote = lastNoteDrawn;
    const currentTime = audioCtx.currentTime;
      while (notesInQueue.length && notesInQueue[0].time < currentTime) {
        drawNote = notesInQueue[0].note;
        notesInQueue.splice(0, 1);   // remove note from queue
        const lastIndicator = (drawNote + 15) % 16;
        const currentBeatIndicator = document.getElementById(`indicator-${drawNote}`);
        const previousBeatIndicator = document.getElementById(`indicator-${lastIndicator}`);
        playAudioLogic(drawNote, loops);
        if (currentBeatIndicator) {
          currentBeatIndicator.style.backgroundColor = '#b5d3e7';
        }
        if (previousBeatIndicator) {
          previousBeatIndicator.style.backgroundColor = '#fff';
        }
      }
    // We only need to draw if the note has moved.
    if (lastNoteDrawn !== drawNote) {
      lastNoteDrawn = drawNote;
    }
    // set up to draw again
    requestRef.current = requestAnimationFrame(beatFunction);
  });

  /**
   * Start/stop state tells us when to start animating.
   */
  useEffect(() => {
    loops = state.loop;
    cancelAnimationFrame(requestRef.current);

    if (state.isPlaying) {
      requestAnimationFrame(() => beatFunction());
    }
  }, [state.isPlaying, state.loop]);


  useEffect(() => {
    loadData();
  }, [match.params.id])

  const loadData = async () => {
    // load data from db.
    const sequenceData = await getLoopSequence(match.params.id);
    // load samples from audio buffer
    const results = loadSamples().then((allSamples) => {
      setSamples(allSamples);
    });
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
      reload={loadData}
    />
  )

  const modules = state.loop && state.loop.modules;
  return (
    <Container maxWidth="lg">
      {isLoading ? (
      <CircularProgress />
    ) : (
      <div>
        <PlayButton />
        <TempoSlider />
        Sequencer
        name: {state.loop.name}
        <BeatIndicator />
        {modules && modules.map(createModules)}
        <CreateNewModule loopId={match.params.id} reloadData={loadData}/>
        <UpdateModulesButton />
        <Recorder />
      </div>
    )}
    </Container>
  );
}

export default Sequencer;