// ColorPanel.jsx

export {
  ColorPanel
}

import {
  ColorController,
} from "../controller/ColorController.js";
import {
  themes,
} from "../view/logoProps.js";

function ColorPanel(props) {
  const colors = Object.keys(themes).map((myTheme) => 
    <ColorController key={myTheme} myTheme={themes[myTheme]} />
  );
  return (
    <div className="ColorPanel">
      {colors}
    </div>
  );
}
