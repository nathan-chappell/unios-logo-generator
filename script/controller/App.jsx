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
  Colors,
  Model,
  updateModel,
} from "../model/NewModel.js"
import {
  RingController,
} from "../controller/RingController.js";
import { 
  ColorController,
} from "../controller/ColorController.js";
import {
  TransitionController,
} from "../controller/TransitionController.js";
import {
  Logo,
} from "../view/Logo.js";

function RingControllers(props) {
  const { rings, setRingAttribute } = props;
  const ringControllers = Object.keys(rings).map(
    (ringId) => {
      let { length, phase, freq } = rings[ringId];
      return (
        <RingController key={ringId} ringId={ringId}
          length={length} phase={phase} freq={freq}
          setRingAttribute={setRingAttribute} />
      );
    });
  return <>{ringControllers}</>;
}

function ColorControllers(props) {
  const { setColors } = props;
  const colorControllers = Object.keys(Colors.themes).map((theme) => 
    <ColorController key={theme} theme={theme} setColors={setColors} />
  );
  return <>{colorControllers}</>
}

function App(props) {
  const [model, dispatch] = React.useReducer(updateModel, Model());
  const { states, transitions, current } = model;
  const rings = states[current].rings;
  const curTransition = transitions[current];

  function setRingAttribute(arg) {
    dispatch({ action : 'setRingAttribute', arg : arg});
  }

  function setColors(theme) {
    dispatch({ action : 'setColor', arg : theme });
  }

  function setTransition(transition) {
    dispatch({ action : 'setTransition', arg : transition });
  }

  return (
    <div className="App">
      <div className="ControlPanel">
        <RingControllers rings={rings} setRingAttribute={setRingAttribute} />
      </div>
      <div className="ColorPanel">
        <ColorControllers setColors={setColors} />
      </div>
      <Logo model={model} />
      <TransitionController transition={curTransition} 
          setTransition={setTransition}/>
    </div>
  );
}
