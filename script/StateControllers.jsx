// StateControllers.jsx

export { 
  SliderAndInput 
};

import {
  clamp,
  roundDigits
} from "./util.js";
import { 
  MouseTracker, 
  Centerer
} from "./UtilityComponents.js";
import {
  Slider
} from "./Slider.js";
import {
  StateHolder,
  ReducerContext
} from "StateHolder.js";

function SliderAndInput(props) {
  const dispatch = React.useContext(ReducerContext);
  const ref = React.useRef(null);
  const _setPct = (x) => {
    //console.log('_setPct',roundDigits(x,3));
    dispatch({
      type : 'rings',
      id : props.ringId,
      attribute : 'length',
      value : roundDigits(x,3),
    });
  }
  /*
   * moveCallback : calculate the position relative to the slider in
   * _Percentage
   */
  function moveCallback(pos) {
    //console.log('moveCallback');
    if (ref.current == null) {
      console.error('SliderAndInput null ref');
      return;
    }
    /*
     * Calculate position of mouse relative to the actual slider bar
     */
    let bbox = ref.current.getBoundingClientRect();
    let left = bbox.left + bbox.width*SliderAttributes.leftPad;
    let width = bbox.width * SliderAttributes.width;
    _setPct(clamp(0,(pos.x - left)/width,1));
  }

  return (
    <div className="SliderAndInput">
      <Centerer>
      <MouseTracker moveCallback={moveCallback}>
        <Slider ref={ref} pct={pct} />
      </MouseTracker>
      </Centerer>
      <Centerer>
      <input type="number" onChange={(e) => _setPct(e.target.value)} 
             value={pct} min={0} max={1} step={.001}
             className={"SliderInput"}></input>
      </Centerer>
    </div>
  );
}
