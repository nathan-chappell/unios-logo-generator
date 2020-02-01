// script.jsx

import { 
  toPct,
  clamp,
  roundDigits 
} from "./util.js";
import { 
  MouseTracker, 
  Centerer, 
  ShowMouse 
} from "./UtilityComponents.js";
import { 
  StateHolder
} from "./StateHolder.js";
import { 
  SliderAndInput 
} from "./StateControllers.js";

function CalculatedPath(props, d) {
  return (
    <path d={d} className={props.className}>
      {props.children}
    </path>
    );
}

function CirclePath(props) {
  const { cx, cy, r } = props;
  let d = `M ${cx} ${cy - r}
           A ${r} ${r} 180 1 0 ${cx} ${cy + r}
           A ${r} ${r} 180 1 0 ${cx} ${cy - r}`
  return CalculatedPath(props,d);
}

function RadialLine(props) {
  const { cx, cy, angle, rStart, rStop } = props;
  const { sin, cos } = Math;
  let d = `M ${cx + rStart*cos(angle)} ${cy - rStart*sin(angle)}
           L ${cx + rStop*cos(angle)} ${cy - rStop*sin(angle)}`;
  return CalculatedPath(props,d);
}

/*
 * Next component:
 * InputAndDial
 *
 * circle and line inside a mousetracker, calculate angle based on
 * mouse position and center of circle.
 */
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
      rStop : circleProps.r
  };
  return (
    <svg className="DialSVG" ref={ref} viewBox="0 0 1 1">
      <CirclePath {...circleProps} className="DialCircle"/>
      <RadialLine {...lineProps} className="DialLine" />
    </svg>
  );
});

function DialAndInput(props) {
  const ref = React.useRef(null);
  const [angle, setAngle] = React.useState(0);

  return (
    <div className="DialAndInput">
      <Dial ref={ref} angle={angle}/>
    </div>
  );
}

ReactDOM.render(
  <StateHolder>
    <ShowMouse />
    <SliderAndInput pct={0} ringId='ring0'/>
    <DialAndInput ringId='ring0'/>
  </StateHolder>,
  document.getElementById('react-root')
);
