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
  mouseTracker
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

/*
 * get callback to calculate new slider position
 */
function getLength(ref, pos) {
  //console.log('length callback');
  if (ref.current == null) {
    console.error('Slider move callback null ref');
    return;
  }
  /*
   * Calculate position of mouse relative to the actual slider bar
   */
  let bbox = ref.current.getBoundingClientRect();
  let left = bbox.left + bbox.width*SliderAttributes.leftPad; let width = bbox.width * SliderAttributes.width;
  return(clamp(0,(pos.x - left)/width,1));
}


let Slider = React.forwardRef((props, ref) => {
  const {width, height, swidth, leftPad, rightPad} = SliderAttributes;
  const { value, callback } = props;
  const frontLineRef = React.useRef(null);
  const backLineRef = React.useRef(null);

  React.useEffect(() => {
    mouseTracker(frontLineRef,callback);
  },[frontLineRef.current]);

  React.useEffect(() => {
    mouseTracker(backLineRef,callback);
  },[backLineRef.current]);

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

  return (
    <svg className="SliderSVG" ref={ref}>
      <line {...getBack()} ref={backLineRef} 
            className="SliderBack" />
      <line {...getFront()} ref={frontLineRef} 
            className="SliderFront" />
    </svg>
  );
});

Slider.getValFromRef = getLength;
