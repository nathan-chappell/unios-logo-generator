// App.jsx

export {
  App
};

/*
import { 
  stateReducer,
  getStateModel,
  StateReducerContext
} from "../model/model.js";
*/
import {
  Spline,
  Transition,
  Ring,
  Colors,
  State,
  Model,
  updateModel,
  verifyAction,
} from "../model/NewModel.js"
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

function _dispatch(model,action) {
  if (!verifyAction(model,action)) {
    console.error('invalid action:',action);
  }
  return updateModel(model,action);
}

function App(props) {
  const [model, dispatch] = React.useReducer(_dispatch, new Model());
  const { states, transitions, current } = model;

  function setRingAttribute(arg) {
    dispatch({ action : 'setRingAttribute', arg : arg});
  }
  const curRings = states[current].rings;

  function setColors(theme) {
    dispatch({ action : 'setColor', arg : theme });
  }

  function setTransition(transition) {
    dispatch({ action : 'setTransition', arg : transition });
  }
  const curTransition = transitions[current];

        //<LogoSVG model={model} />
  return (
    <div className="App">
      <ControlPanel rings={curRings} setRingAttribute={setRingAttribute}/>
      <ColorPanel setColors={setColors}/>
      <TransitionController transition={curTransition} 
          setTransition={setTransition}/>
    </div>
  );
}
