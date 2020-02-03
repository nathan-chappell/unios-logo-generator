// CirclePath.jsx

export {
  CirclePath,
  ViewBox,
};

import {
  deg2rad,
  rad2deg,
} from "../util/util.js";

const ViewBox = "-.5 -.5 1 1";

/*
 * assumes viewbox="-.5 -.5 1 1"
 *
 * @r : radius
 * @length : percentage of circle to draw
 * @?phase : phase of rotation
 */
function CirclePath(props) {
  const { r, length, phase, fwdProps, z } = props;
  const transform = `rotate(${-rad2deg(phase ? phase : 0)})`;
  const longSweepFlag = length >= .5 ? 1 : 0;
  let d;
  // annoying special case for full circle
  if (length == 1) {
    d = `M ${r} ${0}
         A ${r} ${r} 180 1 0 ${-r} ${0}
         A ${r} ${r} 180 1 0 ${r} ${0}`
  } else {
    const deg = 360*length;
    const rad = deg2rad(deg);
    d = `M ${r} ${0}
         A ${r} ${r} ${deg} ${longSweepFlag} 0 
           ${r*Math.cos(rad)} ${-r*Math.sin(rad)}`
  }
  d += z ? ' z' : '';
  return (
    <path d={d} transform={transform} {...fwdProps}>
      {props.children}
    </path>
  );
}
