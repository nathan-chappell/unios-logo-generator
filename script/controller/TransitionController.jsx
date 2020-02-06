// TransitionController.jsx

export {
  TransitionController
}

import {
  TransitionReducerContext,
  TransitionDiagram,
  transitionReducer,
} from "../model/transitions.js";

function SplineController(props) {
  const { spline } = props;
  const { x1, y1, x2, y2 } = spline;
  const d = `M 0 0 C ${x1} ${y1} ${x2} ${y2} 1 1`;
  return (
    <svg viewBox="0 0 1 1" className="SplineController">
      <path d={d} fill="none" stroke="black" strokeWidth=".02" />
    </svg>
  );
}

function TransitionController(props) {
  const {transition} = props;
  const {spline, begin, end} = transition;

  const splineCallback = (spline) => {
    dispatch({ type : 'setSpline', spline : spline });
  };

  return (
    <div className="TransitionController">
      <SplineController spline={spline} callback={splineCallback} />
    </div>
  );
}
