import {
  createContext,
  useReducer
} from "react";

import { updateTempo } from '../utils/scheduler';

export type SchedulerContextType = {
  tempo: number;
  isPlaying: boolean;
  beat: number;
}

const initialState = {
  tempo: 60,
  isPlaying: false,
  beat: 0,
  loop: {
    name: '',
    id: null,
    modules: [],
  },
}
export const SchedulerContext = createContext<{
  state: SchedulerContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'PLAY_STOP':
      return { ...state, isPlaying: !state.isPlaying };
    case 'BEAT':
      return { ...state, beat: action.payload };
    case 'TEMPO':
      updateTempo(action.payload);
      return { ...state, tempo: action.payload };
    case 'FETCH_LOOP':
      return {
        ...state, loop: {
          id: action.payload.id,
          modules: action.payload.modules,
          name: action.payload.name,
        }
      };
    case 'UPDATE_MODULE':
      return {
        ...state,
        loop: {
          ...state.loop,
          modules: state.loop.modules.map(
            (module: any) => module.id === action.payload.id ? { ...module, [action.payload.beat]: action.payload.value }
              : module
          )
        }
      };
    default:
      throw new Error();
  }
}

export const SchedulerContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    //  @ts-ignore Type 'any[]' is not assignable to type 'null'.
    <SchedulerContext.Provider value={[state, dispatch]}>
      {props.children}
    </SchedulerContext.Provider>
  );
};
