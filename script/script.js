// script.jsx
import { MouseTracker, Centerer } from "./UtilityComponents.js";
import { SliderAndInput } from "./Slider.js";
import { toPct, clamp, roundDigits } from "./util.js";
/*
 * Demo the mouse tracker
 */

function ShowMouse(props) {
  const [pos, setPos] = React.useState({
    x: 0,
    y: 0
  }); //console.log('showMouse:', pos);

  const callbacks = {
    moveCallback: setPos,
    wheelCallback: e => {
      setPos({
        x: pos.x + e.deltaX,
        y: pos.y + e.deltaY
      });
    }
  };
  return React.createElement(MouseTracker, callbacks, React.createElement("p", null, "x: ", pos.x, ", y: ", pos.y));
}

ReactDOM.render(React.createElement("div", null, React.createElement(ShowMouse, null), React.createElement(SliderAndInput, {
  pct: 0
})), document.getElementById('react-root'));
