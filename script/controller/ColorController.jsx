// ColorController.jsx

export {
  ColorController,
};

import {
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";

/*
 * need the control logic
 */
function ColorController(props) {
  const { myTheme, setColor } = props;
  const circleProps = { r : .4, length : .5, };
  const fwdInner = {fill : myTheme.inner};
  const fwdOuter = {fill : myTheme.outer};
  return (
    <svg viewBox={ViewBox} onClick={setColor} pointerEvents="visiblePainted"> 
      <g fill="none" stroke="grey" strokeWidth=".02">
        <CirclePath  {...circleProps} phase={90} z="true"
          fwdProps={fwdInner} />
        <CirclePath {...circleProps} phase={270} z="true"
          fwdProps={fwdOuter} />
      </g>
    </svg>
  );
}
