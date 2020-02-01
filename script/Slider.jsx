// Slider.jsx

export { Slider, SliderAndInput };
import { MouseTracker, Centerer } from "./UtilityComponents.js";
import { toPct, clamp, roundDigits } from "./util.js";

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
  // position is a percentage

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
    <svg className="SliderSVG" ref={ref}>
      <line {...getBack()} className="SliderBack" />
      <line {...getFront()} className="SliderFront" />
    </svg>
  );
});

function SliderAndInput(props) {
  const [pct, setPct] = React.useState(0);
  const ref = React.useRef(null);
  const _setPct = (x) => {
    //console.log('_setPct',roundDigits(x,3));
    setPct(roundDigits(x,3));
  }
  /*
   * moveCallback : calculate the position relative to the slider in
   * percentage
   */
  function moveCallback(pos) {
    //console.log('moveCallback');
    if (ref.current == null) {
      console.error('SliderAndInput null ref');
      return;
    }
    /*
     * Calculate position of mouse relative to the actual slider bar
     */
    let bbox = ref.current.getBoundingClientRect();
    let left = bbox.left + bbox.width*SliderAttributes.leftPad;
    let width = bbox.width * SliderAttributes.width;
    _setPct(clamp(0,(pos.x - left)/width,1));
  }

  return (
    <div className="SliderAndInput">
      <Centerer>
      <MouseTracker moveCallback={moveCallback}>
        <Slider ref={ref} pct={pct} />
      </MouseTracker>
      </Centerer>
      <Centerer>
      <input type="number" onChange={(e) => _setPct(e.target.value)} 
             value={pct} min={0} max={1} step={.001}
             className={"SliderInput"}></input>
      </Centerer>
    </div>
  );
}
