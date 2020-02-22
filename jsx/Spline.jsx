// jsx/Spline.jsx
//
// #TESTABLE COMPONENT

function _D() {console.log("DEBUG",...arguments);}

export {
  Spline,
};

import {
  useMouseTracker,
} from "./MouseTracker.js";
import {
  TrackedCircle,
} from "./TrackedCircle.js";

function Spline(props) {
  const { callback } = props;
  let { value } = props;
  const strokeWidth = .03;
  const r = 2*strokeWidth;
  if (value == null) {
    value = { 
      p1: {cx: 0,cy: 1,r: r}, 
      p2: {cx: 1,cy: 0,r: r},
    };
  }
  const { p1, p2 } = value;

  const svgRef = React.useRef(null);

  const p1Callback = React.useCallback((newP1) => {
    callback({p1: newP1, p2: p2});
  },[callback,p2.cx,p2.cy,r]);

  const p2Callback = React.useCallback((newP2) => {
    callback({p1: p1, p2: newP2});
  },[callback,p1.cx,p1.cy,r]);

  const pathProps = {
    d : `M 0 0 C ${p1.cx} ${p1.cy} ${p2.cx} ${p2.cy} 1 1`,
    stroke : "black",
    strokeWidth : strokeWidth,
    fill : "none",
  };
  const p1TrackedCircleProps = {
    callback : p1Callback,
    value : p1,
    svgRef : svgRef,
  };
  const p1LineProps = {
    x1 : 0,
    y1 : 0,
    x2 : p1.cx,
    y2 : p1.cy,
    stroke : "grey",
    strokeWidth : strokeWidth,
  };
  const p2TrackedCircleProps = {
    callback : p2Callback,
    value : p2,
    svgRef : svgRef,
  };
  const p2LineProps = {
    x1 : 1,
    y1 : 1,
    x2 : p2.cx,
    y2 : p2.cy,
    stroke : "grey",
    strokeWidth : strokeWidth,
  }
  const borderRectProps = {
    x : 0,
    y : 0,
    width : 1,
    height : 1,
    strokeWidth : strokeWidth/2,
    stroke : "black",
    fill : "none",
  };
  const svgProps = {
    viewBox : `0 0 1 1`,
    className : "svgSpline",
    ref : svgRef,
  };

  return (
    <svg {...svgProps} >
      <line {...p1LineProps} />
      <line {...p2LineProps} />
      <path {...pathProps} />
      <TrackedCircle {...p1TrackedCircleProps} />
      <TrackedCircle {...p2TrackedCircleProps} />
      <rect {...borderRectProps} />
    </svg>
  );
}
