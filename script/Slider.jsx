// Slider.jsx

export { 
  Slider,
  SliderAttributes,
  getCalcLengthCb
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

/*
 * get callback to calculate new slider position
 */
function getCalcLengthCb(ref) {
  return (pos) => {
    //console.log('length callback');
    if (ref.current == null) {
      console.error('Slider move callback null ref');
      return;
    }
    /*
     * Calculate position of mouse relative to the actual slider bar
     */
    let bbox = ref.current.getBoundingClientRect();
    let left = bbox.left + bbox.width*SliderAttributes.leftPad;
    let width = bbox.width * SliderAttributes.width;
    return(clamp(0,(pos.x - left)/width,1));
  };
}


let Slider = React.forwardRef((props, ref) => {
  ref = ref || {};
  const {width, height, swidth, leftPad, rightPad} = SliderAttributes;
  const { length } = props;
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
      x1: leftPad + length*width - swidth,
      x2: leftPad + length*width + swidth,
      y1: height,
      y2: height
    });
  }

  return (
    <svg className="SliderSVG" ref={ref}>
      <line {...getBack()} className="SliderBack" />
      <line {...getFront()} className="SliderFront" />
    </svg>
  );
});
