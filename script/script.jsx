// script.jsx

import {
  App
} from "./controller/App.js";

/*
 * NEXT:
 * export to svg 
 *    blob -> file or something
 * animations:
 *    stateChain: stateLink
 *    stateLink: state, next, transition
 * styling:
 *    make it more obvious what does what
 * static page generation:
 *    babel script:
 *      es6-modules + jsx => commonjs-modules + js
 *      ReactDOMServer that shit
 */

import {
  getCircle_d,
  getOuterPathID,
} from "./util/util.js";
import {
  logoProps,
} from "./view/logoProps.js";

/*
 * transitionProps = { dur, keySpline, begin, calcmode, fill}
 */
function RingTransition(props) {
  const { oldring, newring, ringId } = props;
  let transitionProps = React.useContext(TransitionProps);
  const pathAnimationProps = {
    ...transitionProps,
    href : getOuterPathID(ringId),
    attributeName : 'd',
    from : getCircle_d(logoProps.radii[oldring.ringId]),
    to : getCircle_d(logoProps.radii[newring.ringId]),
  };
  const rotationAnimationProps = {
    ...transitionProps,
    href : getOuterRotationID(ringId),
    type : 'rotate',
    /*
     * Fuck... how to change the speed of rotation?
    from : oldring.
    */
  };
  return ;
}

function StateTransitions(props) {
  const { oldstate, newstate } = props;
  let transitionProps = {};
  return (
    <TransitionProps.Provider value={transitionProps}>
      <RingTransitions oldrings={oldstate.rings} 
                       newrings={newstate.rings} />
    </TransitionProps.Provider>
  );
}

const TransitionProps = React.createContext(null);

const TransitionModel = {
  begin : 0,
  dur : 1,
  calcMode : 'spline',
  keySpline : '0 0 1 1',
  fill : 'freeze',
};

function TransitionController(props) {
  const [transition, setTransition] = React.useState(TransitionModel);
  return (
    <TransitionProps.Provider value={transition}>
      <div className="TransitionController">
        transition controller
      </div>
    </TransitionProps.Provider>
  );
}


ReactDOM.render(
  <div>
    <div> foo</div>
    <App />
  </div>,
  document.getElementById('react-root')
);
