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
  ControlPanel,
} from "./controller/ControlPanel.js";

/*
 * show the damn Logo!
 */
function PreviewLogo(props) {
}

/*
 * dummy to lift the state above the Preview and ControlPanel
 */
function TopLevel(props) {
}

ReactDOM.render(
  <ControlPanel />,
  document.getElementById('react-root')
);
