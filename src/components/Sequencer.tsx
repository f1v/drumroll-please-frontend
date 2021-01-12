import React, { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Module from '../components/Module'
import { getLoopSequence } from '../api/loop'
import { updateModule } from '../api/module';

declare type Props = {
  match: {
    params: {
      id: number
    }
  },

}

const useStyles = makeStyles((theme: Theme) => ({

}));

function Sequencer({ match }: Props) {
  const classes = useStyles();
  const [sequenceData, setSequenceData] = useState({
    name: '',
    id: null,
    modules: [],
  })
  const [shouldRefreshData, setShouldRefreshData] = useState(false)

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
      Sequencer
      name: {sequenceData.name}
      {modules && modules.map(createModules)}
    </Container>
  );
}

export default Sequencer;