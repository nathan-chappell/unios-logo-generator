// Dial.jsx

export {
  getAngle,
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

function getThetaDeg(ref, x, y) {
  if (ref.current == null) {
    console.error('Dial move callback null ref');
    return;
  }
  /*
   * Calculate position of mouse relative to the actual slider bar
   */
  let bbox = ref.current.getBoundingClientRect();
  let dx = x - (bbox.left + bbox.width/2);
  let dy = y - (bbox.top + bbox.height/2);
  return -1*rad2deg(Math.atan2(dy,dx));
}

// get callback to calculate new dial phase
function getAngle(ref,pos) {
  let theta = getThetaDeg(ref, pos.x, pos.y);
  theta = theta > 0 ? theta : theta + 360;
  return(clamp(0,theta,360));
}

let Dial = React.forwardRef((props,ref) => {
  const transform = `rotate(${-props.value})`;
  //console.log('dial transform:',transform);
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

Dial.getValFromRef = getAngle;
