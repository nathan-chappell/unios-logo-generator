// logoSVG.jsx

export {
  LogoSVG,
};

import {
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";
import {
  logoProps,
} from "../view/logoProps.js";

function LogoSVG(props) {
  const { rings } = props;
  const { inner, outer } = props.colors;
  const ringIds = Object.keys(rings);
  const innerRings = ringIds.map((key,index) => {
    const circleProps = {
      r : logoProps.radii[index],
      length : 1,
    }
    return <CirclePath key={key} {...circleProps} />;
  });
  const outerRings = ringIds.map((key,index) => {
    const circleProps = {
      r : logoProps.radii[index],
      length : rings[key].length,
      angle : rings[key].angle,
    }
    return <CirclePath key={key} {...circleProps} />;
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
