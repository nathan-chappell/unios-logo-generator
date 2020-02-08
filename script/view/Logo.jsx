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

/*
 * animatables:
 *   zoom         - animateTransform - applies to all
 *   inner stroke - g - applies to all inner
 *   outer stroke - g - applies to all outer
 *   phase        - CirclePath - per ring
 *   length       - CirclePath - per ring
 *   freq         - FreqRotation - per ring
 */

const ClassDict = {};

function MkClass(name,tag,get,attributeName,type) {
  if (name in ClassDict) return ClassDict[name];
  let Class = {};
  Object.assign(Class, {
      name : name,
      tag : tag,
      get : get,
      getHref : (model) => mkName(model.name,name),
      getAttrs : (animation) => animation[name],
      mkAttrs : () => {
        const attrs = animAttributes(attributeName,type);
        // makes Class a non-enumerable property of attrs
        return Object.defineProperty(attrs,'Class',{value : Class});
      }
  });
  ClassDict[name] = Class;
  return Class;
}

// handled completely differently... 
//    attributes gathered from states
//    phase transformed to simulate spline
//    transform 'set' at end of duration to effect change
//    requires two separate animations for two different attributes...
function FreqClass(ringId) {
  return MkClass(
    mkName('Freq',ringId),
    'SPECIAL',
    (state) => state.rings[ringId].freq,
    'SPECIAL',
  );
}

function LengthClass(ringId) {
  return MkClass(
    mkName('Length',ringId),
    'animate',
    (state) => state.rings[ringId].length,
    'd',
  );
}

function PhaseClass(ringId) {
  return MkClass(
    mkName('Phase',ringId),
    'animateTransform',
    (state) => state.rings[ringId].phase,
    'transform',
    'rotate',
  );
}

const OuterStroke = MkClass(
  'OuterStroke',
  'transform',
  (state) => state.colors.outer,
  'stroke',
);

const InnerStroke = MkClass(
  'InnerStroke',
  'transform',
  (state) => state.colors.inner,
  'stroke',
);

const Zoom = MkClass(
  'Zoom',
  'animateTransform',
  (state) => state.zoom,
  'transform',
  'scale',
);

function firstPass(attributes,model,i) {
  const Class = attributes.Class;
  attributes.id = mkName(Class.name,i,getState(model,i).name,randId());
  attributes.to = Class.get(getState(model,i));
  attributes.href = Class.getHref(model);
}

function secondPass(attributes,animationList,i) {
  const Class = attributes.Class;
  const prev = Class.getAttrs(getListItem(animationList,i-1));
  attributes.from = prev.to;
  attributes.begin = prev.id + ".end";
}

const nRings = 4;

function RingAnimationItem(ringId) {
  return {
    [mkName('Phase',ringId)] : PhaseClass(ringId).mkAttrs(),
    [mkName('Length',ringId)] : LengthClass(ringId).mkAttrs(),
    [mkName('Freq',ringId)] : FreqClass(ringId).mkAttrs(),
  };
}

function RingsAnimationItem(ringIds) {
  let item = {};
  for (const ringId of ringIds) {
    Object.assign(item,RingAnimationItem(ringId));
  }
  return item;
}

/*
 * I think that I should just gen-up the ClassDict and use that to 
 * define the AnimationItem...
 *
 * Another ABS like AnimationItem(model) { generateClasses... }
 */
function AnimationItem(ringIds) {
  let item = {
    Zoom : Zoom.mkAttrs(),
    InnerStroke : InnerStroke.mkAttrs(),
    OuterStroke : OuterStroke.mkAttrs(),
  };
  return Object.assign(item,RingsAnimationItem(ringIds));
}

function Logo(props) {
  const { model } = props;
  const { states, transitions, current, id } = model;
  const length = model.states.length;
  const animationList = new Array(length);

  for (let i = 0; i < length; ++i) {
    animationList[i] = AnimationItem(Object.keys(states[i].rings));
    for (const key in animationList[i]) {
      firstPass(animationList[i][key],model,i);
    }
  }
  DEBUG(ClassDict);

  for (let i = 0; i < length; ++i) {
    for (const key in animationList[i]) {
      secondPass(animationList[i][key],animationList,i);
    }
  }

  console.log(animationList);
  return <div>Logo</div>
}
