// Slider.jsx

export { 
  Slider 
};

import { 
  toPct,
  clamp, 
  roundDigits,
} from "./util.js";

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

let Slider = React.forwardRef((props, ref) => {
  ref = ref || {};
  const {width, height, swidth, leftPad, rightPad} = SliderAttributes;
  const { pct } = props;
  // position is a _Percentage

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
      x1: leftPad + pct*width - swidth,
      x2: leftPad + pct*width + swidth,
      y1: height,
      y2: height
    });
  }

  return (
    <svg className="SliderSVG" ref={ref} viewBox="0 0 1 1">
      <line {...getBack()} className="SliderBack" />
      <line {...getFront()} className="SliderFront" />
    </svg>
  );
});
