// Dial.jsx

export {
  getCalcAngleCb,
  Dial
}

import { 
  toPct,
  clamp,
  roundDigits 
} from "./util.js";
import {
  CalculatedPath,
  CirclePath,
  RadialLine,
} from "./svgUtil.js";

/*
 * get callback to calculate new dial angle
 */
function getCalcAngleCb(ref) {
  return (pos) => {
    //console.log('angle callback');
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
  const { angle } = props;
  const circleProps = { 
    cx : .5, 
    cy : .5, 
    r : .45 
  };
  const lineProps = { 
    ...circleProps, 
      angle : props.angle,
      rStart : .05,
      rStop : circleProps.r,
  };
  return (
    <svg className="DialSVG" ref={ref} viewBox="0 0 1 1">
      <CirclePath {...circleProps} className="DialCircle"/>
      <RadialLine {...lineProps} className="DialLine" />
    </svg>
  );
});

