// StateControllers.jsx

export { 
  RingController
};

import {
  clamp,
  roundDigits,
  deg2rad,
  rad2deg,
} from "./util.js";
import { 
  MouseTracker, 
  Centerer
} from "./UtilityComponents.js";
import {
  Slider,
  getCalcLengthCb,
} from "./Slider.js";
import {
  Dial,
  getCalcAngleCb,
} from "./Dial.js";
import {
  ReducerContext
} from "./reducer.js";

function RingController(props) {
  const { length, angle, ringId} = props;
  const dispatch = React.useContext(ReducerContext);
  const sliderRef = React.useRef(null);
  const dialRef = React.useRef(null);
  const action = {
      type : 'rings',
      id : ringId,
  };
  // length handling
  const _setLength = (x) => {
    dispatch({
      ...action,
      attribute : 'length',
      value : roundDigits(x,3),
    });
  }
  // tricky...
  const sliderMoveCb = React.useCallback(
    (() => {
      const calc = getCalcLengthCb(sliderRef);
      return (pos) => {
        _setLength(calc(pos))
      };
    })(),[sliderRef.current]);

  // angle handling
  const _setAngle = (x) => {
    dispatch({
      ...action,
      attribute : 'angle',
      value : roundDigits(x,3),
    });
  }
  // tricky...
  const dialMoveCb = React.useCallback(
    (() => {
      const calc = getCalcAngleCb(dialRef);
      return (pos) => {
        _setAngle(calc(pos))
      };
    })(),[dialRef.current]);

  return (
    <div className="RingC">
      <MouseTracker moveCallback={sliderMoveCb} 
        className="RingCSlider">
        <Slider ref={sliderRef} length={length} />
      </MouseTracker>
      <input type="number" value={length} min={0} max={1} step={.001}
             onChange={(e) => _setLength(e.target.value)}
             className="RingCSliderInput" />
      <MouseTracker moveCallback={dialMoveCb} 
        className="RingCDial">
        <Dial ref={dialRef} angle={angle} />
      </MouseTracker>
      <input type="number" value={roundDigits(rad2deg(angle),1)} 
             min={0} max={360} step={.1} onChange={
               (e) => _setAngle(deg2rad(e.target.value))
             }
             className="RingCDialInput" />
    </div>
  );
}
