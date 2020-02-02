// ControlPanel.jsx

export {
  ControlPanel,
};

import {
  RingController,
} from "../controller/RingController.js";
import { 
  reducer,
  stateModel,
  ReducerContext
} from "../model/model.js";

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
