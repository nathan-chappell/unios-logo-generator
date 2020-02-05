// App.jsx

export {
  App
};

import { 
  reducer,
  stateModel,
  ReducerContext
} from "../model/model.js";
import { 
  ControlPanel,
} from "../controller/ControlPanel.js";
import { 
  ColorPanel,
} from "../controller/ColorPanel.js";
import {
  LogoSVG,
} from "../view/logoSVG.js";

function App(props) {
  let [state, dispatch] = React.useReducer(reducer,stateModel);
  return (
    <ReducerContext.Provider value={dispatch}>
      <div className="App">
        <ControlPanel rings={state.rings}/>
        <LogoSVG rings={state.rings} colors={state.colors}/>
        <ColorPanel />
      </div>
    </ReducerContext.Provider>
  );
}
