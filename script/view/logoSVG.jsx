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

function FreqRotation(props) {
  const { freq } = props;
  //console.log('freq:', freq);
  let animateProps = {
    attributeName : 'transform',
    type : 'rotate',
    from : 0,
    to : -freq*360,
    dur : '1s',
    repeatCount : 'indefinite',
    accumulate : 'sum',
    additive : 'sum',
  };
  return <animateTransform {...animateProps} />;
}

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
    return (
      <g key={key}>
        <CirclePath {...circleProps} />
        <FreqRotation freq={rings[key].freq} />
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
