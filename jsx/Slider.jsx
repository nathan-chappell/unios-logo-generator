// jsx/Slider.jsx
//
// #TESTABLE COMPONENT

function _D() {console.log("DEBUG",...arguments);}

export {
  Slider,
};

import {
  useMouseTracker
} from "./MouseTracker.js";

function rad2deg(rad) { return 180*rad/Math.PI; }

function getClientRelativeX(payload,element) {
  const {clientX} = payload;
  const bbox = element.getBoundingClientRect();
  if (clientX <= bbox.left) return 0;
  if (clientX >= bbox.right) return 1;
  return (clientX - bbox.left)/bbox.width;
}

function getTrackDispatcher(callback,ref) {
  function dispatch(action) {
    const { type, payload} = action;
    switch (type) {
      case 'trackStart':
      case 'trackMove':
        callback(getClientRelativeX(payload,ref.current));
        break;
    }
  }
  return dispatch;
}

function Slider(props) {
  let { value, callback } = props;
  const ref = React.useRef(null);
  if (value == null) value = 0;

  const dispatch = React.useCallback(
    getTrackDispatcher(callback, ref),
    [callback,ref],
  );
  const mouseTrackerProps = {
    ref : ref,
    dispatch : dispatch,
  };
  useMouseTracker(mouseTrackerProps);

  const w = 1;
  const h = 1;
  const thinWidth = w/15;
  const thickLength = w/10
  const thickWidth = 3*thinWidth;
  const thinLineProps = {
    x1 : 0,
    x2 : 1,
    y1 : 0,
    y2 : 0,
    stroke : "black",
    strokeWidth : thinWidth,
    strokeLinecap: "round",
  };
  const thickLineProps = {
    x1 : -thickLength/2,
    x2 : thickLength/2,
    y1 : 0,
    y2 : 0,
    stroke : "black",
    strokeWidth : thickWidth,
    strokeLinecap: "round",
    transform : `translate(${value},0)`,
  };
  const svgProps = {
    ref : ref,
    viewBox : `${-thickLength-thickWidth} -.5 ${1+2*(thickLength+thickWidth)} 1`,
    className : "svgSlider",
  };

  return (
    <svg {...svgProps} >
      <line {...thinLineProps} />
      <line {...thickLineProps} />
    </svg>
  );
}
