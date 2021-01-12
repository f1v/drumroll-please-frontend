import React, { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { getAllLoops } from '../api/loop'

declare type Loop = {
  name: string,
  id: number,
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  loopsContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '6px'
  }
}));

function Loops() {
  const classes = useStyles();
  const [allLoops, setAllLoops] = useState([])
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const data = await getAllLoops()
    data && setAllLoops(data)
  }

  const createLinksToLoops = (loop: Loop) => (
    <a href={`/loops/${loop.id}`}>
      {loop.name || '[anonymous loop]'}
    </a>
  )

  return (
    <Container className={classes.main} maxWidth="lg">
      Loops
      <div className={classes.loopsContainer}>
        {allLoops && allLoops.map(createLinksToLoops)}
      </div>
    </Container>
  );
}

export default Loops;