// Colors.jsx

export {
  Colors,
};

import {
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";

function Colors(props) {
  const { theme } = props;
  console.log('colors',theme);
  const circleProps = {
    r : .4,
    length : .5,
  };
  return (
    <svg viewBox={ViewBox}> 
      <g fill="none" stroke="grey" strokeWidth=".02">
        <CirclePath fill={theme.inner} {...circleProps}
          angle={0}/>
        <CirclePath fill={theme.outer} {...circleProps} 
          angle={Math.PI}/>
      </g>
    </svg>
  );
}
