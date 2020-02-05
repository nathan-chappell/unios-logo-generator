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
