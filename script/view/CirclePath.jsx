// CirclePath.jsx

export {
  CirclePath,
  ViewBox,
  FreqRotation,
};

import {
  deg2rad,
  rad2deg,
  getOuterRotationID,
  getCircle_d,
} from "../util/util.js";

const ViewBox = "-.5 -.5 1 1";

function FreqRotation(props) {
  const { freq, ringId } = props;
  //console.log('freq:', freq);
  let animateProps = {
    id : getOuterRotationID(ringId),
    attributeName : 'transform',
    type : 'rotate',
    from : 0,
    to : -freq*360,
    dur : '1s',
    repeatCount : 'indefinite',
    accumulate : 'sum',
    additive : 'sum',
  };
  return (
    <animateTransform {...animateProps}>
      {props.children}
    </animateTransform>
  );
}

/*
 * assumes viewbox="-.5 -.5 1 1"
 *
 * @r : radius
 * @length : percentage of circle to draw
 * @?phase : phase of rotation
 */
const CirclePath = React.forwardRef((props, ref) => {
  const { id, r, length, phase, fwdProps, z } = props;
  //console.log('CirclePath fwd:', fwdProps);
  const transform = `rotate(${-(phase ? phase : 0)})`;
  let d = getCircle_d(length,r);
  d += z ? ' z' : '';
  return (
    <path ref={ref} d={d} transform={transform} id={id} {...fwdProps}>
      {props.children}
    </path>
  );
});
