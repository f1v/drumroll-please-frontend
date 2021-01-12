// import React, { useState } from 'react';
// import audioCtx from './utils/audioContext';
// import {
//   resetCounters,
//   scheduler,
//   stop,
//  } from './utils/scheduler';
// import './App.css';
// import {
//   Button,
//   CssBaseline,
//   Container,
//   makeStyles,
//   Theme,
// } from '@material-ui/core';
// import Icon from '@material-ui/core/Icon';

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   main: {
//     marginTop: theme.spacing(8),
//     marginBottom: theme.spacing(2),
//   },
// }));

// function App() {
//   const classes = useStyles();
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const handlePlayClick = () => {
//     if (!isPlaying) {
//       resetCounters();
//       audioCtx.state === 'suspended' && audioCtx.resume();
//       scheduler();
//     } else {
//       stop();
//     }
//     setIsPlaying(!isPlaying);
//   };
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Container component="main" className={classes.main} maxWidth="lg">
//         Hello
//         <Button
//           variant="contained"
//           color="primary"
//           endIcon={isPlaying ? (
//             <Icon>stop</Icon>
//           ) : (
//               <Icon>play_arrow</Icon>
//             )
//           }
//           onClick={handlePlayClick}
//         >
//           {isPlaying ? (
//             'Stop'
//           ) : (
//               'Play'
//             )}
//         </Button>
//       </Container>
//     </div>
//   );
// }

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Loops from './pages/Loops';
import Sequencer from './components/Sequencer';
import { SchedulerContextProvider } from './context/SchedulerContext';

function App() {

  return (
    <SchedulerContextProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/loops" exact component={Loops} />
            <Route path="/loops/:id" component={Sequencer} />
          </Switch>
        </div>
      </Router>
    </SchedulerContextProvider>
  );
}

export default App;
