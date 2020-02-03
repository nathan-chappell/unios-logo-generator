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
  console.log(ColorController);
  const colors = Object.keys(themes).map((theme) => {
    <ColorController key={theme} theme={themes[theme]} />
  });
  Object.keys(themes).map((theme,key) => {
    console.log(theme,themes[theme]);
  });
  console.log(colors);
  return (
    <div className="ColorPanel">
      {colors}
    </div>
  );
}
