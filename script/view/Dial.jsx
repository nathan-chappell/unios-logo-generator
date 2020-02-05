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
import {
  mouseTracker
} from "../controller/MouseTracker.js";

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

const Dial = React.forwardRef((props,ref) => {
  const { callback } = props;
  const transform = `rotate(${-props.value})`;
  const r = .35;
  const fwdProps = { className : "DialCircle" };

  React.useEffect(() => {
    mouseTracker(ref,callback);
  },[ref.current]);

  return (
    <svg className="DialSVG" viewBox={ViewBox} transform={transform}> 
      <g ref={ref} pointerEvents="visibleFill">
        <CirclePath r={r} length={1} fwdProps={fwdProps}/>
      </g>
      <line x1=".1" x2={r} y1="0" y2="0" className="DialLine" />
    </svg>
  );
});

Dial.getValFromRef = getAngle;
