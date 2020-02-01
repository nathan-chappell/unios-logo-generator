// script.jsx

import { MouseTracker, Centerer } from "./UtilityComponents.js";
import { SliderAndInput } from "./Slider.js";
import { toPct, clamp, roundDigits } from "./util.js";

/*
 * Demo the mouse tracker
 */
function ShowMouse(props) {
  const [pos,setPos] = React.useState({x:0,y:0});
  //console.log('showMouse:', pos);
  const callbacks = {
    moveCallback : setPos,
    wheelCallback : (e) => {
      setPos({ x:(pos.x + e.deltaX), y:(pos.y + e.deltaY) });
    }
  }

  return (
    <MouseTracker {...callbacks}>
      <p>x: {pos.x}, y: {pos.y}</p>
    </MouseTracker>
  );
}

ReactDOM.render(
  <div><ShowMouse /><SliderAndInput pct={0}/></div>,
  document.getElementById('react-root')
);
