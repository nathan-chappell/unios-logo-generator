// script.jsx

import { 
  toPct,
  clamp,
  roundDigits 
} from "./util.js";
import { 
  MouseTracker, 
  Centerer, 
  ShowMouse 
} from "./UtilityComponents.js";
import { 
  reducer,
  stateModel,
  ReducerContext
} from "./reducer.js";
import { 
  RingController,
} from "./StateControllers.js";

/*
 * Make a little button to hide it...
 * We need to connect the control panel to a drawing somewhere...
 */
function ControlPanel(props) {
  console.log('building controller');
  let [state, dispatch] = React.useReducer(reducer,stateModel);
  const { rings } = state;
  let controllers = Object.keys(rings).map(
    (ringId) => {
      let { length, angle } = rings[ringId];
      return (
        <RingController key={ringId} ringId={ringId}
          length={length} angle={angle} />
      );
    });
  
  return (
    <ReducerContext.Provider value={dispatch}>
      <div className="ControlPanel">
        {controllers}
      </div>
    </ReducerContext.Provider>
  );
}

/*
 * show the damn state...  Need to lift it higher!
 */
function PreviewLogo(props) {
}

function TopLevel(props) {
}

ReactDOM.render(
  <ControlPanel />,
  document.getElementById('react-root')
);
