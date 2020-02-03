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
      phase : rings[key].phase,
    }
    const animateProps = {
      attributeName : "transform",
      type : "rotate",
      from : 0,
      to : 360,
      //dur : `${rings[key].period}s`
      dur : "1s",
      repeatCount : "indefinite",
    };
    return (
      <g key={key}>
        <CirclePath {...circleProps} />
        <animateTransform {...animateProps} />
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
