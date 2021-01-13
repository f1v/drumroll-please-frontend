import React, { useContext } from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Pad from './Pad'
import InstrumentDisplay from './InstrumentDisplay';
import DeleteModule from './DeleteModule';
import { SchedulerContext } from '../context/SchedulerContext';
import { deleteModule } from '../api/module';

declare type Props = {
  moduleId: number,
  loopId: number,
  reload: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  moduleContainer: {
    border: 'solid blue 2px',
    height: '100px',
    display: 'flex',

  }
}));

function Module ({ moduleId, loopId, reload }: Props) {
  const classes = useStyles()
  const defaultModuleParams = {
    beat_1_1: false,
    beat_1_2: false,
    beat_1_3: false,
    beat_1_4: false,
    beat_2_1: false,
    beat_2_2: false,
    beat_2_3: false,
    beat_2_4: false,
    beat_3_1: false,
    beat_3_2: false,
    beat_3_3: false,
    beat_3_4: false,
    beat_4_1: false,
    beat_4_2: false,
    beat_4_3: false,
    beat_4_4: false,
    effects: "{}",
    id: moduleId,
    instrument: '',
    loopId,
    name: '',
    volume: 50,
  }

  // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  const [state, dispatch] = useContext(SchedulerContext);
  const module = state.loop.modules.find((module: any) => module.id === moduleId);

  const updateBeat = (beat: string) => {
    const prevBeat = module[beat]
    const newBeat = !prevBeat
    dispatch({
      type: 'UPDATE_MODULE',
      payload: {
        id: moduleId,
        beat: beat,
        value: newBeat,
      }
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @ts-ignore
    const beat = event.target.id
    updateBeat(beat)
  }

  const handleDelete = async () => {
    console.log({ moduleId })
    const { status } = await deleteModule(moduleId)
    console.log({ status })
    status === 200 && reload()
  }

  return (
    <Container className={classes.moduleContainer}>
      <InstrumentDisplay instrument={module.instrument}/>
      <Pad beat='beat_1_1' isChecked={module.beat_1_1} handleClick={handleClick}/>
      <Pad beat='beat_1_2' isChecked={module.beat_1_2} handleClick={handleClick}/>
      <Pad beat='beat_1_3' isChecked={module.beat_1_3} handleClick={handleClick}/>
      <Pad beat='beat_1_4' isChecked={module.beat_1_4} handleClick={handleClick}/>
      <Pad beat='beat_2_1' isChecked={module.beat_2_1} handleClick={handleClick}/>
      <Pad beat='beat_2_2' isChecked={module.beat_2_2} handleClick={handleClick}/>
      <Pad beat='beat_2_3' isChecked={module.beat_2_3} handleClick={handleClick}/>
      <Pad beat='beat_2_4' isChecked={module.beat_2_4} handleClick={handleClick}/>
      <Pad beat='beat_3_1' isChecked={module.beat_3_1} handleClick={handleClick}/>
      <Pad beat='beat_3_2' isChecked={module.beat_3_2} handleClick={handleClick}/>
      <Pad beat='beat_3_3' isChecked={module.beat_3_3} handleClick={handleClick}/>
      <Pad beat='beat_3_4' isChecked={module.beat_3_4} handleClick={handleClick}/>
      <Pad beat='beat_4_1' isChecked={module.beat_4_1} handleClick={handleClick}/>
      <Pad beat='beat_4_2' isChecked={module.beat_4_2} handleClick={handleClick}/>
      <Pad beat='beat_4_3' isChecked={module.beat_4_3} handleClick={handleClick}/>
      <Pad beat='beat_4_4' isChecked={module.beat_4_4} handleClick={handleClick}/>
      <DeleteModule handleDelete={handleDelete}/>
    </Container>
  )
}

export default Module