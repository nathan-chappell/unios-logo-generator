// Colors.jsx

export {
  Colors,
};

import {
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";

function Colors(props) {
  const { myTheme } = props;
  const circleProps = {
    r : .4,
    length : .5,
  };
  const fwdInner = {fill : myTheme.inner};
  const fwdOuter = {fill : myTheme.outer};
  return (
    <svg viewBox={ViewBox} {...props.fwdProps}> 
      <g fill="none" stroke="grey" strokeWidth=".02">
        <CirclePath  {...circleProps} angle={0} z="true"
          fwdProps={fwdInner} />
        <CirclePath {...circleProps} angle={Math.PI} z="true"
          fwdProps={fwdOuter} />
      </g>
    </svg>
  );
}
