// components/dial.jsx
//
// #TESTABLE COMPONENT

function _D() {console.log("DEBUG",...arguments);}

export {
  Dial,
};

import {
  useMouseTracker
} from "./MouseTracker.js";

function rad2deg(rad) { return 180*rad/Math.PI; }

function getClientAngle(payload,element) {
  const {clientX, clientY} = payload;
  const bbox = element.getBoundingClientRect();
  const cx = (bbox.left + bbox.width)/2;
  const cy = (bbox.top + bbox.height)/2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  // mathematical y axis in inverted
  return rad2deg(-Math.atan2(-dy,dx));
}

function getTrackDispatcher(callback,ref) {
  function dispatch(action) {
    const { type, payload} = action;
    switch (type) {
      case 'trackStart':
      case 'trackMove':
        callback(getClientAngle(payload,ref.current));
        break;
    }
  }
  return dispatch;
}

function Dial(props) {
  const { callback } = props;
  let { value } = props;
  if (value == null) value = 0;

  const ref = React.useRef(null);

  const dispatch = React.useCallback(
    getTrackDispatcher(callback, ref),
    [callback,ref],
  );
  const mouseTrackerProps = {
    ref : ref,
    dispatch : dispatch,
  };
  useMouseTracker(mouseTrackerProps);

  const strokeWidth = .05;
  const r = .5 - 2*strokeWidth;
  const circleProps = {
    cx : 0,
    cy : 0,
    r : r,
    fill : "none",
    stroke : "black",
    strokeWidth : strokeWidth,
  };
  const lineProps = {
    x1 : r/4,
    x2 : r,
    y1 : 0,
    y2 : 0,
    stroke : "black",
    strokeWidth : strokeWidth,
    strokeLinecap: "round",
    transform : `rotate(${value})`,
  };
  const svgProps = {
    ref : ref,
    viewBox : "-.5 -.5 1 1",
    className : "svgDial",
  };

  return (
    <svg {...svgProps} >
      <circle {...circleProps} />
      <line {...lineProps} />
    </svg>
  );
}
