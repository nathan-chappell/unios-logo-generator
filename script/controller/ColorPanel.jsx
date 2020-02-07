// ColorPanel.jsx

export {
  ColorPanel
}

import {
  Colors,
} from "../model/NewModel.js";
import {
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";

function ColorController(props) {
  const { myTheme, setColor } = props;
  const circleProps = { r : .4, length : .5, };
  const fwdInner = {fill : myTheme.inner};
  const fwdOuter = {fill : myTheme.outer};
  return (
    <svg viewBox={ViewBox} onClick={setColor} pointerEvents="visiblePainted"
         className="ColorController"> 
      <g fill="none" stroke="grey">
        <CirclePath  {...circleProps} phase={90} z="true"
          fwdProps={fwdInner} />
        <CirclePath {...circleProps} phase={270} z="true"
          fwdProps={fwdOuter} />
      </g>
    </svg>
  );
}

function ColorPanel(props) {
  const { setColors } = props;
  const colors = Object.keys(Colors.themes).map((myTheme) => 
    <ColorController key={myTheme} myTheme={Colors(myTheme)} 
      setColor={() => setColors(myTheme)} />
  );
  return (
    <div className="ColorPanel">
      {colors}
    </div>
  );
}
