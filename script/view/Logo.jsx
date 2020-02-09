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
    id : null,
    to : null,
    href : null,
    from : null,
    begin : null,
    dur : null,
    keySplines : null,
  };
  if (type) attributes.type = type;
  return attributes;
}

function defaultRender(attributes) {
  if (attrs.Class.tag == 'animate') {
    return <animate {...attributes} />;
  } else {
    return <animateTransform {...attributes} />;
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
  });
  GlobalClassDict[name] = Class;
  return Class;
}

function accelerationSpline(spline,from,to) {
}

function freqRender(attributes) {
  /*
   * SET BY := FROM
   * ANIMATE PHASE := keyTimes values
   *
   */
}

// handled completely differently... 
//    attributes gathered from states
//    phase transformed to simulate spline
//    transform 'set' at end of duration to effect change
//    requires two separate animations for two different attributes...
function MkFreqClass(ringId) {
  return MkClass({
    name : mkName('Freq',ringId),
    tag : 'SPECIAL',
    get : (state) => state.rings[ringId].freq,
    attributeName : 'SPECIAL',
    render : freqRender,
  });
}

function MkLengthClass(ringId) {
  return MkClass({
    name : mkName('Length',ringId),
    tag : 'animate',
    get : (state) => state.rings[ringId].length,
    attributeName : 'd',
  });
}

function MkPhaseClass(ringId) {
  return MkClass({
    name : mkName('Phase',ringId),
    tag : 'animateTransform',
    get : (state) => state.rings[ringId].phase,
    attributeName : 'transform',
    type : 'rotate',
  });
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

function getKeySplines(spline) {
  const { x1, y1, x2, y2, } = spline;
  return `x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`;
}

function firstPass(attributes,model,i) {
  const Class = attributes.Class;
  const state = getState(model,i);
  const transition = getTransition(model,i);
  attributes.id = mkName(Class.name,i,state.name,randId());
  attributes.to = Class.get(state);
  attributes.href = '#' + Class.getHref(model);
  attributes.dur = transition.dur;
  attributes.keySplines = getKeySplines(transition.spline);
}

function secondPass(attributes,animationList,i) {
  const Class = attributes.Class;
  const prev = Class.getAttrs(getListItem(animationList,i-1));
  attributes.from = prev.to;
  attributes.begin = prev.id + ".end";
}

function AnimationItem(ClassDict) {
  const item = {};
  for (const ClassId in ClassDict) {
    const Class = ClassDict[ClassId];
    item[Class.name] = Class.mkAttrs();
  }
  return item;
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

  return <div>Logo</div>
}
