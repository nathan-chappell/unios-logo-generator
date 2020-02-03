// Dial.jsx

export {
  getCalcAngleCb,
  Dial
}

import { 
  toPct,
  clamp,
  roundDigits,
  rad2deg,
} from "../util/util.js";
import {
  ViewBox,
  CirclePath,
} from "../view/CirclePath.js";

/*
 * get callback to calculate new dial phase
 */
function getCalcAngleCb(ref) {
  return (pos) => {
    //console.log('phase callback');
    if (ref.current == null) {
      console.error('Slider move callback null ref');
      return;
    }
    /*
     * Calculate position of mouse relative to the actual slider bar
     */
    let bbox = ref.current.getBoundingClientRect();
    let dx = pos.x - (bbox.left + bbox.width/2);
    let dy = pos.y - (bbox.top + bbox.height/2);
    let theta = -1*Math.atan2(dy,dx);
    theta = theta > 0 ? theta : theta + 2*Math.PI
    return(clamp(0,theta,Math.PI*2));
  };
}

let Dial = React.forwardRef((props,ref) => {
  const transform = `rotate(${-rad2deg(props.phase)})`;
  const r = .45;
  let fwdProps = { className : "DialCircle" };
  return (
    <svg className="DialSVG" ref={ref} viewBox={ViewBox}
         transform={transform}>
      <CirclePath r={r} length={1} fwdProps={fwdProps}/>
      <line x1=".1" x2={r} y1="0" y2="0" className="DialLine" />
    </svg>
  );
});

