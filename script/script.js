function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// script.jsx
import MouseTracker from "./MouseTracker.js";
import { toPct, clamp } from "./util.js";
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
/*
 * Consistent properties of the Slider, units are percent
 */


const SliderAttributes = {
  width: .7,
  height: .5,
  swidth: .02
};
SliderAttributes.leftPad = .5 - SliderAttributes.width / 2;
SliderAttributes.rightPad = .5 + SliderAttributes.width / 2;
let Slider = React.forwardRef((props, ref) => {
  ref = ref || {};
  const {
    width,
    height,
    swidth,
    leftPad,
    rightPad
  } = SliderAttributes;
  const {
    pct
  } = props; // position is a percentage

  function getBack() {
    return toPct({
      x1: leftPad,
      x2: rightPad,
      y1: height,
      y2: height
    });
  }

  function getFront() {
    return toPct({
      x1: leftPad + pct * width - swidth,
      x2: leftPad + pct * width + swidth,
      y1: height,
      y2: height
    });
  }

  return React.createElement("svg", {
    className: "Slider",
    ref: ref
  }, React.createElement("line", _extends({}, getBack(), {
    className: "SliderBack"
  })), React.createElement("line", _extends({}, getFront(), {
    className: "SliderFront"
  })));
});

function UseSlider(props) {
  const [pct, setPct] = React.useState(0);
  const ref = React.useRef(null);
  /*
   * moveCallback : calculate the position relative to the slider in
   * percentage
   */

  function moveCallback(pos) {
    console.log('moveCallback');

    if (ref.current == null) {
      console.error('UseSlider null ref');
      return;
    }

    let bbox = ref.current.getBoundingClientRect();
    let left = bbox.left + bbox.width * SliderAttributes.leftPad;
    let width = bbox.width * SliderAttributes.width;
    setPct(clamp(0, (pos.x - left) / width, 1));
  }

  return React.createElement(MouseTracker, {
    moveCallback: moveCallback
  }, React.createElement(Slider, {
    ref: ref,
    pct: pct
  }));
}

ReactDOM.render(React.createElement("div", null, React.createElement(ShowMouse, null), React.createElement(UseSlider, {
  pct: 0
})), document.getElementById('react-root'));
