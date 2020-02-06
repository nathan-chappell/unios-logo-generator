// App.jsx

export {
  App
};

import { 
  stateReducer,
  getStateModel,
  StateReducerContext
} from "../model/model.js";
import { 
  ControlPanel,
} from "../controller/ControlPanel.js";
import { 
  ColorPanel,
} from "../controller/ColorPanel.js";
import { 
  transitionReducer,
  getTransitionModel,
  TransitionDiagram,
  TransitionReducerContext,
} from "../model/transitions.js";
import {
  TransitionController,
} from "../controller/TransitionController.js";
import {
  LogoSVG,
} from "../view/logoSVG.js";

function App(props) {
  const [state, dispatch] = React.useReducer(stateReducer,getStateModel());
  const [transitionDiagram, transitionDispatch] = 
      React.useReducer(transitionReducer,new TransitionDiagram());
  console.log(state);
  return (
    <div className="App">
      <StateReducerContext.Provider value={dispatch}>
        <ControlPanel rings={state.rings}/>
        <LogoSVG rings={state.rings} colors={state.colors}/>
        <ColorPanel />
      </StateReducerContext.Provider>
      <TransitionReducerContext.Provider value={transitionDispatch}>
        <TransitionController 
            transition={transitionDiagram.getCurTransition()}/>
      </TransitionReducerContext.Provider>
    </div>
  );
}
