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

function TopLevel(props) {
  console.log('building controller');
  let [state, dispatch] = React.useReducer(reducer,stateModel);
  const { rings } = state;
  return (
    <ReducerContext.Provider value={dispatch}>
      <RingController ringId='ring0'
        length={rings['ring0'].length} 
        angle={rings['ring0'].angle} />,
    </ReducerContext.Provider>
  );
}

ReactDOM.render(
  <TopLevel />,
  document.getElementById('react-root')
);
