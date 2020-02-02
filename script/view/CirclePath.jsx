// svgUtil.jsx

export {
  CirclePath,
  ViewBox,
};

import {
  deg2rad,
} from "../util/util.js";

const ViewBox = "-.5 -.5 1 1";

/*
 * assumes viewbox="-.5 -.5 1 1"
 *
 * @r : radius
 * @length : percentage of circle to draw
 * @?angle : angle of rotation
 */
function CirclePath(props) {
  const { r, length, angle, fwdProps } = props;
  const transform = `rotate(${angle ? angle : 0})`;
  let d;
  // annoying special case for full circle
  if (length == 1) {
    d = `M ${r} ${0}
         A ${r} ${r} 180 1 0 ${-r} ${0}
         A ${r} ${r} 180 1 0 ${r} ${0}`
  } else {
    let deg = 360*length;
    let rad = deg2rad(deg);
    d = `M ${r} ${0}
         A ${r} ${r} ${a} 1 0 ${Math.cos(rad)} ${Math.sin(rad)}`
  }
  return (
    <path d={d} transform={transform} {...fwdProps}>
      {props.children}
    </path>
  );
}
