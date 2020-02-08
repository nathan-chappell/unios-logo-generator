// ColorController.jsx

export {
  ColorController,
}

import {
  Colors,
} from "../model/NewModel.js";
import {
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";

function ColorController(props) {
  const { theme, setColors } = props;
  const { inner, outer } = Colors(theme);
  const circleProps = { r : .4, length : .5, };
  const setColor = React.useCallback(() => setColors(theme),[theme]);
  return (
    <svg viewBox={ViewBox} onClick={setColor} 
         pointerEvents="visiblePainted" className="ColorController"> 
      <g fill="none" stroke="grey">
        <CirclePath  {...circleProps} phase={90} z="true"
          fwdProps={{fill : inner}} />
        <CirclePath {...circleProps} phase={270} z="true"
          fwdProps={{fill : outer}} />
      </g>
    </svg>
  );
}
