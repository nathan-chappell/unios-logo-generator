// Slider.jsx

export { 
  Slider,
  SliderAttributes,
};

import { 
  toPct,
  clamp, 
  roundDigits,
} from "../util/util.js";
import {
  mouseTracker,
  getRelX,
} from "../controller/MouseTracker.js";

/*
 * Consistent properties of the Slider, units are percent
 */
const SliderAttributes = {
  width : .7,
  height : .5,
  swidth : .02
};
SliderAttributes.leftPad = .5 - SliderAttributes.width/2;
SliderAttributes.rightPad = .5 + SliderAttributes.width/2;

function Slider(props) {
  const {width, height, swidth, leftPad, rightPad} = SliderAttributes;
  const { value, callback } = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    mouseTracker(ref,(pos) => callback(getRelX(ref,pos)));
  },[ref.current]);

  function getBack() {
    return toPct({ 
      x1: leftPad,
      x2: rightPad, 
      y1: height, 
      y2: height
    });
  }

  function getFront() {
    return toPct({ 
      x1: leftPad + value*width - swidth,
      x2: leftPad + value*width + swidth,
      y1: height,
      y2: height
    });
  }

  const svgProps = {
    className : "SliderSVG",
    pointerEvents : "painted",
  };

  return (
    <svg className={"SliderSVG"}>
      <g pointerEvents="painted" ref={ref}>
        <line {...getBack()} className="SliderBack" />
        <line {...getFront()} className="SliderFront" />
      </g>
    </svg>
  );
};
