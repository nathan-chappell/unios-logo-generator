// TransitionController.jsx

export {
  TransitionController
}

import {
  mouseTracker,
  getRelX,
  getRelY,
} from "../controller/MouseTracker.js";
import {
  Spline,
  Transition,
} from "../model/NewModel.js";

function SplineController(props) {
  const { spline, setSpline } = props;
  const { x1, y1, x2, y2 } = spline;
  const d = `M 0 0 C ${x1} ${y1} ${x2} ${y2} 1 1`;
  const p1Ref = React.useRef(null);
  const p2Ref = React.useRef(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    mouseTracker(p1Ref, (pos) => {
      const x = getRelX(ref,pos);
      const y = getRelY(ref,pos);
      setSpline(new Spline(x,y,x2,y2));
    });
  },[ref.current,p1Ref.current,p2Ref.current]);

  React.useEffect(() => {
    mouseTracker(p2Ref, (pos) => {
      const x = getRelX(ref,pos);
      const y = getRelY(ref,pos);
      setSpline(new Spline(x1,y1,x,y));
    });
  },[ref.current,p1Ref.current,p2Ref.current]);

  return (
    <svg viewBox="0 0 1 1" className="SplineController">
      <path ref={ref} d={d} fill="none" stroke="black" strokeWidth=".02" />
      <circle ref={p1Ref} cx={x1} cy={y1} r={.02} fill="blue" />
      <circle ref={p2Ref} cx={x2} cy={y2} r={.02} fill="green" />
      <line x1={0} y1={0} x2={x1} y2={y1} stroke="black" strokeWidth=".01" />
      <line x1={1} y1={1} x2={x2} y2={y2} stroke="black" strokeWidth=".01" />
    </svg>
  );
}

function TransitionController(props) {
  const { transition, setTransition } = props;
  const { spline, begin, dur } = transition;

  const setSpline = React.useCallback((x1,y1,x2,y2) => {
    setTransition(new Transition(begin,dur,spline));
  },[setTransition,begin,dur]);

  const beginCallback = React.useCallback((begin) => {
    setTransition(new Transition(begin,dur,spline));
  },[setTransition,spline,dur]);

  const durCallback = React.useCallback((dur) => {
    setTransition(new Transition(begin,dur,spline));
  },[setTransition,begin,spline]);

  return (
    <div className="TransitionController">
      <SplineController spline={spline} setSpline={setSpline} />
    </div>
  );
}
