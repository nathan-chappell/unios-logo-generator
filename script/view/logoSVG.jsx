// logoSVG.jsx

export {
  LogoSVG,
};

import {
  FreqRotation,
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";
import {
  logoProps,
} from "../view/logoProps.js";
import {
  getOuterPathID,
  getOuterRotationID,
} from "../util/util.js";

/*
 * need to implement the new LogoSVG element built from the new model.
 *    each state is an element
 *    final transition wraps around the end (maybe configurable)
 *    transitions are created with reference to elements the transfer
 *    running tally of times kept for creation of transitions
 */

/*
 * create well-labeled shell
 * create transitions from each state
 *
 * animatables:
 *   zoom         - animateTransform - applies to all
 *   inner stroke - g - applies to all inner
 *   outer stroke - g - applies to all outer
 *   phase        - CirclePath - per ring
 *   length       - CirclePath - per ring
 *   freq         - FreqRotation - per ring
 *
 * for each animatable:
 *   attributeName 
 *   id - get name attributeName, curState
 *   href - id of prev
 *   from - value of prev
 *   to - value from curState
 *
 * common to all:
 *   calcMode - "spline"
 *   dur - input
 *   keySplines - input
 */

const animZoom = {
  tag : 'animateTransform',
  transformInfo : {
    attributeName : 'transform'
    type : 'scale',
  },
  getId : (state,i) => 'zoom' + i + state.name + randId(),
  getFrom : (state) => state.
};

const animatables = {
  'zoom' : animZoom,
};


function LogoSVG(props) {
  const { rings } = props;
  const { inner, outer } = props.colors;
  const ringIds = Object.keys(rings);
  const innerRings = ringIds.map((ringId,index) => {
    const circleProps = {
      r : logoProps.radii[index],
      length : 1,
    }
    return <CirclePath key={ringId} {...circleProps} />;
  });
  const outerRings = ringIds.map((ringId,index) => {
    const circleProps = {
      id : getOuterPathID(ringId),
      r : logoProps.radii[index],
      length : rings[ringId].length,
      phase : rings[ringId].phase,
    }
    const freqProps = {
      id : getOuterRotationID(ringId),
      freq : rings[ringId].freq,
    };
    return (
      <g key={ringId}>
        <CirclePath {...circleProps} />
        <FreqRotation  {...freqProps} />
      </g>
    );
  });
  return (
    <svg viewBox={ViewBox} className="LogoSVG">
      <g fill="none" strokeLinecap="round">
        <g strokeWidth={logoProps.innerStroke} stroke={inner}>
          {innerRings}
        </g>
        <g strokeWidth={logoProps.outerStroke} stroke={outer}>
          {outerRings}
        </g>
      </g>
    </svg>
  );
}
