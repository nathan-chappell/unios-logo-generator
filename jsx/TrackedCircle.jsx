// jsx/TrackedCircle.jsx
//
// #SVG_TESTABLE COMPONENT
//
// no containing SVG element

function _D() {console.log("DEBUG",...arguments);}

export {
  TrackedCircle,
};

import {
  useMouseTracker
} from "./MouseTracker.js";

function getClientRelativeY(payload,element) {
  const {clientY} = payload;
  const bbox = element.getBoundingClientRect();
  if (clientY <= bbox.top) return 0;
  if (clientY >= bbox.bottom) return 1;
  return (clientY - bbox.top)/bbox.width;
}

function getClientRelativeX(payload,element) {
  const {clientX} = payload;
  const bbox = element.getBoundingClientRect();
  if (clientX <= bbox.left) return 0;
  if (clientX >= bbox.right) return 1;
  return (clientX - bbox.left)/bbox.width;
}

function getTrackDispatcher(callback,ref,r) {
  function dispatch(action) {
    const { type, payload } = action;
    switch (type) {
      case 'trackStart':
      case 'trackMove':
        const cx = getClientRelativeX(payload,ref.current);
        const cy = getClientRelativeY(payload,ref.current);
        callback({ cx: cx, cy: cy, r: r});
        break;
    }
  }
  return dispatch;
}

let oldCb = null;
let oldDisp = null;

function TrackedCircle(props) {
  const { svgRef, callback } = props;
  let { value } = props;
  if (svgRef === undefined) {
    throw Error('TrackedCircle requires svgRef as prop');
  }
  if (value == null) value = { cx : 0, cy : 0, r : .1 };
  const { cx, cy, r } = value;

  const ref = React.useRef(null);

  const dispatch = React.useCallback(
    getTrackDispatcher(callback,svgRef,r),
    [callback,svgRef,r],
  );
  const mouseTrackerProps = {
    ref : ref,
    dispatch : dispatch,
  };
  useMouseTracker(mouseTrackerProps);

  const circleProps = {
    cx : cx,
    cy : cy,
    r : r,
    ref : ref,
  };

  return (
      <circle {...circleProps} />
  );
}
