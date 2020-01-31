// script.jsx

import MouseTracker from "./MouseTracker.js";
import { toPct, clamp } from "./util.js";

/*
 * Demo the mouse tracker
 */
function ShowMouse(props) {
  const [pos,setPos] = React.useState({x:0,y:0});
  //console.log('showMouse:', pos);
  const callbacks = {
    moveCallback : setPos,
    wheelCallback : (e) => {
      setPos({ x:(pos.x + e.deltaX), y:(pos.y + e.deltaY) });
    }
  }

  return (
    <MouseTracker {...callbacks}>
      <p>x: {pos.x}, y: {pos.y}</p>
    </MouseTracker>
  );
}

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
    <svg className="Slider" ref={ref}>
      <line {...getBack()} className="SliderBack" />
      <line {...getFront()} className="SliderFront" />
    </svg>
  );
});

function UseSlider(props) {
  const [pct, setPct] = React.useState(0);
  const ref = React.useRef(null);
  /*
   * moveCallback : calculate the position relative to the slider in
   * percentage
   */
  function moveCallback(pos) {
    console.log('moveCallback');
    if (ref.current == null) {
      console.error('UseSlider null ref');
      return;
    }
    /*
     * Calculate position of mouse relative to the actual slider bar
     */
    let bbox = ref.current.getBoundingClientRect();
    let left = bbox.left + bbox.width*SliderAttributes.leftPad;
    let width = bbox.width * SliderAttributes.width;
    setPct(clamp(0,(pos.x - left)/width,1));
  }

  return (
    <MouseTracker moveCallback={moveCallback}>
      <Slider ref={ref} pct={pct} />
    </MouseTracker>
  );
}

ReactDOM.render(
  <div><ShowMouse /><UseSlider pct={0}/></div>,
  document.getElementById('react-root')
);
