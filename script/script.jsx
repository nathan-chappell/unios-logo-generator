// script.jsx

import { 
  toPct,
  clamp,
  roundDigits 
} from "./util/util.js";
import { 
  MouseTracker, 
  Centerer, 
  ShowMouse 
} from "./controller/MouseTracker.js";
import { 
  reducer,
  stateModel,
  ReducerContext
} from "./model/model.js";
import { 
  RingController,
} from "./controller/RingController.js";
import { 
  ColorController,
} from "./controller/ColorController.js";
import { 
  ControlPanel,
} from "./controller/ControlPanel.js";
import { 
  ColorPanel,
} from "./controller/ColorPanel.js";
import {
  LogoSVG,
} from "./view/logoSVG.js";

/*
 * Need a color picker...
 */

function App(props) {
  let [state, dispatch] = React.useReducer(reducer,stateModel);
  return (
    <ReducerContext.Provider value={dispatch}>
      <div className="App">
        <ControlPanel rings={state.rings}/>
        <LogoSVG rings={state.rings} color={state.color}/>
        <ColorPanel />
      </div>
    </ReducerContext.Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
