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
  addClassName,
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

function Dial(props) {
  const { callback, value, fwdProps } = props;
  const ref = React.useRef(null);
  const r = .35;

  React.useEffect(() => {
    mouseTracker(ref,(pos) => callback(getAngle(ref,pos)));
  },[ref.current]);

  addClassName(fwdProps,"DialSVG");
  fwdProps.pointerEvents = "visibleFill";

  const circleProps = {
    className : "DialCircle",
  };

  const lineProps = {
    className : "DialLine",
    x1 : .1, y1 : 0,
    x2 :  r,  y2 : 0,
    transform : `rotate(${-value})`,
  };

  return (
    <svg {...fwdProps} viewBox={ViewBox}> 
      <CirclePath ref={ref} r={r} length={1} fwdProps={circleProps}/>
      <line {...lineProps} />
    </svg>
  );
}
