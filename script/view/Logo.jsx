// Logo.jsx

export {
  Logo,
};

import {
  FreqRotation,
  CirclePath,
  ViewBox,
} from "../view/CirclePath.js";
import {
  logoProps,
} from "../view/logoProps.js";
import {
  getOuterPathID,
  getOuterRotationID,
  mkName,
  DEBUG,
  DEBUG_FN,
  randId,
  getCircle_d,
} from "../util/util.js";

/*
 * need to implement the new LogoSVG element built from the new model.
 *    each state is an element
 *    final transition wraps around the end (maybe configurable)
 *    transitions are created with reference to elements the transfer
 *    running tally of times kept for creation of transitions
 */

/*
 * create well-labeled shell
 * create transitions from each state
 *
 * animatables:
 *   zoom         - animateTransform - applies to all
 *   inner stroke - g - applies to all inner
 *   outer stroke - g - applies to all outer
 *   phase        - CirclePath - per ring
 *   length       - CirclePath - per ring
 *   freq         - FreqRotation - per ring
 *
 * for each animatable:
 *   attributeName 
 *   id - get name attributeName, curState
 *   href - id of prev
 *   from - value of prev
 *   to - value from curState
 *
 * common to all:
 *   calcMode - "spline"
 *   dur - input
 *   keySplines - input
 */

function getListItem(list,i) {
  const n = list.length;
  // if i < 0 and i % n == 0, then we need the following nonsense
  if (i < 0) return list[ ((i % n) + n) % n ];
  else return list[ i % n ];
}

function getState(model,i) {
  return getListItem(model.states,i);
};

function getTransition(model,i) {
  return getListItem(model.transitions,i);
};

function animAttributes(name,type) {
  let attributes = {
    attributeName : name,
    calcMode : "spline",
    fill : "freeze",
    id : null,
    to : null,
    href : null,
    from : null,
    begin : null,
    dur : null,
    keySplines : null,
  };
  // implicitly animateTransform
  if (type) {
    attributes.type = type;
    attributes.additive = "sum";
  }
  return attributes;
}

function beginFrom0(attributes) {
  if (attributes.current) {
    attributes.begin += ";0";
  }
}

function defaultRender(attributes) {
  if (attrs.Class.tag == 'animate') {
    return <animate {...attributes} />;
  } else if (attrs.Class.tag == 'animate') {
    return <animateTransform {...attributes} />;
  } else {
    DEBUG('unreachable');
  }
}

/*
 * animatables:
 *   zoom         - animateTransform - applies to all
 *   inner stroke - g - applies to all inner
 *   outer stroke - g - applies to all outer
 *   phase        - CirclePath - per ring
 *   length       - CirclePath - per ring
 *   freq         - FreqRotation - per ring
 */

// this global could mean trouble...
const GlobalClassDict = {};

/*
 * Class constructor:
 *  @name    : Introspect
 *  @tag     : Properties
 *  @get     : PureVirtual
 *  @render  : Virtual
 *  getHref  <- @name
 *  getAttrs <- @name
 *  mkAttrs  <- @attributeName, @type
 */
function MkClass(ClassProps) {
  const { name, tag, get, attributeName, type, render } = ClassProps;
  if (name in GlobalClassDict) return GlobalClassDict[name];
  let Class = {};
  Object.assign(Class, {
      name : name,
      tag : tag,
      get : get,
      getHref : (model) => mkName(model.id,name),
      getAttrs : (animation) => animation[name],
      mkAttrs : () => {
        const attrs = animAttributes(attributeName,type);
        // makes Class a non-enumerable property of attrs
        return Object.defineProperty(attrs,'Class',{value : Class});
      },
      render : (typeof render === 'function' ? render : defaultRender),
    // here goes some svg_make_shell_of_layout function...
  });
  GlobalClassDict[name] = Class;
  return Class;
}

// Handle the frequency change...

const N = 256;

function getTimeArrays() {
  const T3 = new Array(N + 1);
  const T2T_ = new Array(N + 1);
  const TT_2 = new Array(N + 1);
  const T_3 = new Array(N + 1);
  for (let i = 0; i <= N; ++i) {
    T3[i] = (i/N)**3;
    T2T_[i] = (i/N)**2*(1-i/N);
    TT_2[i] = (i/N)*(1-i/N)**2;
    T_3[i] = (1-i/N)**3;
  }
  return [T3,T2T_,TT_2,T_3];
}

const [T3,T2T_,TT_2,T_3] = getTimeArrays();

function integrate(spline,from,to) {
  const { x1, y1, x2, y2 } = spline;
  const keyTimes = new Array(N +1);
  const keyValues = new Array(N +1);
  for (let i = 0; i <= N; ++i) {
    keyTimes[i] = 3*TT_2[i]*x1 + 3*T2T_[i]*x2 + T3[i];
    keyValues[i] = 3*TT_2[i]*x1 + 3*T2T_[i]*x2 + T3[i];
    if (i > 0) keyValues[i] += keyValues[i-1];
  }
  return [keyTimes, keyValues.map((v) => v*(to-from))];
}

function freqFixUpAttributes(attributes) {
  const { from, to, keySplines } = attributes;
  const freqTransAttrs = {...attributes};
  const freqRotAttrs = {...attributes};
  const [x1,y1,x2,y2] = keySplines2Spline(keySplines);
  const [keyTimes, keyValues] = integrate(spline,from,to);

  delete freqTransAttrs.keySplines;
  freqTransAttrs.keyTimes = keyTimes;
  freqTransAttrs.keyValues = keyValues;
  freqRotAttrs.repeatCount = "indefinite";

  return [freqTransAttrs, freqRotAttrs];
}

function freqRender(attributes) {
  [ freqTransAttrs, freqRotAttrs ] = freqFixUpAttributes(attributes);
  return (
    <>
      <animateTransform ...freqTransAttrs />
      <animateTransform ...freqRotAttrs />
    </>
  );
}

function outerRingHrefGetter(ringId) {
  return (model) => mkName(model,ringId,'outer');
}

// handled completely differently... 
//    attributes gathered from states
//    phase transformed to simulate spline
//    transform 'set' at end of duration to effect change
//    requires two separate animations for two different attributes...
function MkFreqClass(ringId) {
  const Class = MkClass({
    name : mkName('Freq',ringId),
    tag : 'SPECIAL',
    get : (state) => state.rings[ringId].freq,
    attributeName : 'SPECIAL',
    render : freqRender,
  });
  Class.getHref = outerRingHrefGetter(ringId);
  return Class;
}

function MkLengthClass(ringId) {
  const Class = MkClass({
    name : mkName('Length',ringId),
    tag : 'animate',
    get : (state) => state.rings[ringId].length,
    attributeName : 'd',
  });
  Class.getHref = outerRingHrefGetter(ringId);
  return Class;
}

function MkPhaseClass(ringId) {
  const Class = MkClass({
    name : mkName('Phase',ringId),
    tag : 'animateTransform',
    get : (state) => state.rings[ringId].phase,
    attributeName : 'transform',
    type : 'rotate',
  });
  Class.getHref = outerRingHrefGetter(ringId);
  return Class;
}

function MkClassDict(model) {
  const ClassDict = {};

  const OuterStroke = MkClass({
    name : 'OuterStroke',
    tag : 'transform',
    get : (state) => state.colors.outer,
    attributeName : 'stroke',
  });

  const InnerStroke = MkClass({
    name : 'InnerStroke',
    tag : 'transform',
    get : (state) => state.colors.inner,
    attributeName : 'stroke',
  });

  const Zoom = MkClass({
    name : 'Zoom',
    tag : 'animateTransform',
    get : (state) => state.zoom,
    attributeName : 'transform',
    type: 'scale',
  });
  
  ClassDict[InnerStroke.name] = InnerStroke;
  ClassDict[OuterStroke.name] = OuterStroke;
  ClassDict[Zoom.name] = Zoom;

  for (const state of model.states) {
    for (const ringId in state.rings) {
      let PhaseClass = MkPhaseClass(ringId);
      let LengthClass = MkLengthClass(ringId);
      let FreqClass = MkFreqClass(ringId);
      ClassDict[PhaseClass.name] = PhaseClass;
      ClassDict[LengthClass.name] = LengthClass;
      ClassDict[FreqClass.name] = FreqClass;
    }
  }

  return ClassDict;
}

function keySplines2Spline(keySplines) {
  return keySplines.split(',').map(v => Number(v));
}

function spline2keySplines(spline) {
  const { x1, y1, x2, y2, } = spline;
  return `${x1},${y1},${x2},${y2}`;
}

function firstPass(attributes,model,i) {
  const Class = attributes.Class;
  const state = getState(model,i);
  const transition = getTransition(model,i);
  attributes.id = mkName(Class.name,i,state.name,randId());
  attributes.to = Class.get(state);
  attributes.href = '#' + Class.getHref(model);
  attributes.dur = transition.dur;
  attributes.keySplines = spline2keySplines(transition.spline);
}

function secondPass(attributes,animationList,i) {
  const Class = attributes.Class;
  const prev = Class.getAttrs(getListItem(animationList,i-1));
  attributes.from = prev.to;
  attributes.begin = prev.id + ".end";
  beginFrom0(attributes);
}

function AnimationItem(ClassDict) {
  const item = {};
  for (const ClassId in ClassDict) {
    const Class = ClassDict[ClassId];
    item[Class.name] = Class.mkAttrs();
  }
  return item;
}

function SVGRing(ring,outerRingId) {
  const { length, phase, freq, level } = ring;
  const r = logoProps.radii[i];
  const inner_d = getCircle_d(1,r);
  const outer_d = getCircle_d(1,r);
  return (
    //<path d={inner_d} 
  );
}

function Logo(props) {
  const { model } = props;
  const { states, transitions, current, id } = model;
  const length = model.states.length;
  const animationList = new Array(length);
  const ClassDict = MkClassDict(model);
  DEBUG(ClassDict);

  for (let i = 0; i < length; ++i) {
    animationList[i] = AnimationItem(ClassDict);
    if (i == current) {
      Object.defineProperty(animationList[i],'current',true);
    }
    for (const key in animationList[i]) {
      firstPass(animationList[i][key],model,i);
    }
  }

  for (let i = 0; i < length; ++i) {
    for (const key in animationList[i]) {
      secondPass(animationList[i][key],animationList,i);
    }
  }

  DEBUG(animationList);
  const animations = [];
  for (let animation of animationList) {
    for (let item in animation) {
      animations.push(animation[item].render());
    }
  }

  const svg_rings = {};
  for (let state of model.states) {
    for (let ringId in state.rings) {
      if (!(ringId in rings)) {
        rings[ringId] = SVGRing(state.rings[ringId],ringId);
      }
    }
  }
  /*
   * and insert the whole clusterjam into a shell of the thing...
   * shell is built from the model...
   */

  return (
    <svg viewBox={ViewBox} className="Logo" id={model.id}>
    </svg>
  );
}
