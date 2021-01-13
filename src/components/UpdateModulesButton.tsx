import React from 'react';

import {
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import { SchedulerContext } from '../context/SchedulerContext';
import { updateModule } from '../api/module';

const useStyles = makeStyles((theme: Theme) => ({

}));

function UpdateModuleButton() {
  const classes = useStyles();
  // @ts-ignore Type '{ state: SchedulerContextType; dispatch: Dispatch<any>; }' is not an array type.
  const [state, dispatch] = React.useContext(SchedulerContext);

  const persistLoopUpdates = async () => {
    const modules = state.loop.modules;
    const promises = modules.map(async (module: any) => {
      const moduleRes = await updateModule(module)
      return moduleRes
    })
    const moduleResponses = await Promise.all(promises);
  }

  return (
      <Button
        variant="contained"
        color="primary"
        endIcon={(
          <Icon>save</Icon>
        )}
        onClick={persistLoopUpdates}
      >
        Save
      </Button>
  );
}

export default UpdateModuleButton;