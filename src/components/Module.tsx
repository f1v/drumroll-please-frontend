import React, { useState } from 'react';
import { updateModule } from '../api/module'
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Pad from './Pad'
import InstrumentDisplay from './InstrumentDisplay'

declare type Props = {
  index: number,
  initialData: any,
  moduleId: number,
  loopId: number,
  onChange: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  moduleContainer: {
    border: 'solid blue 2px',
    height: '100px',
    display: 'flex',

  }
}));

function Module ({ index, initialData, moduleId, loopId, onChange }: Props) {
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

  const [module, setModule] = useState(initialData || defaultModuleParams)

  const update = async (key: string, value: any) => {
    // @ts-ignore
    const updatedModule = await updateModule({
      ...module,
      [key]: value,
    })
    console.log({ updatedModule })
    // @ts-ignore
    updatedModule && setModule(updatedModule)
  }

  const updateBeat = async (beat: string) => {
    console.log(beat)
    const prevBeat = module[beat]
    const newBeat = !prevBeat
    update(beat, newBeat)
  }

  const handleClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(event.target)
    // @ts-ignore
    const beat = event.target.id 
    updateBeat(beat)
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
    </Container>
  )
}

export default Module