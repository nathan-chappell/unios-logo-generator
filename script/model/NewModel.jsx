// NewModel.jsx

export {
  Spline,
  Transition,
  Ring,
  maxFreq,
  Colors,
  State,
  Model,
  verifyAttribute,
  verifyAction,
  updateModel,
};

import {
  randId,
} from "../util/util.js";
import {
  themes,
} from "../view/logoProps.js";

const defaultSpline = {x1 : .25, y1 : .1, x2 : .25, y2 : 1};

function Spline(x1,y1,x2,y2) {
  // default is 'ease'
  if (arguments.length == 0) {
    return {...defaultSpline};
  }
  return {x1 : x1, y1 : y1, x2 : x2, y2 : y2 };
}

const defaultTransition = { dur : 1, spline : Spline() };

function Transition(dur,spline) {
  if (arguments.length == 0) {
    return {...defaultTransition};
  }
  return { dur : dur, spline : {...spline}};
}

// imported
Colors.themes = themes;

function Colors(theme) {
  //console.log('colors:',theme,);
  if (!(theme in Colors.themes)) {
    console.error('invalid theme:', theme);
    console.trace();
    theme = Object.keys(Colors.themes)[0];
  }
  return Colors.themes[theme];
}

const maxFreq = 2;
const defaultRing = { length : 1, phase : 0, freq : 0};

function Ring(length,phase,freq) {
  if (arguments.length == 0) {
    return {...defaultRing};
  }
  return { length : length, phase : phase, freq : freq };
}

function Ring_level(level) {
  return {...Ring(), level : level };
}

function defaultRingSet() {
  const rings = {};
  for (let i = 0; i < 4; ++i) rings['ring' + i] = Ring_level(i);
  return rings;
}

const defaultState = { 
  name : 'state' + randId(),
  rings : defaultRingSet(),
  colors : {...Colors.themes[Object.keys(Colors.themes)[0]]},
  zoom : 1,
};

function State(name,rings,colors,zoom) {
  if (arguments.length == 0) {
    return {...defaultState};
  }
  return { 
    name : name,
    rings : rings,
    colors : colors,
    zoom : zoom 
  };
}

function Model() {
  return { 
    id : 'Model-' + randId(),
    states : [State()], 
    transitions : [Transition()], 
    current : 0,
  };
}

function updateModel(model,command) {
  //console.log(model,command);
  const curState = model.states[model.current];
  const {action, arg} = command;
  if (!verifyAction(model,action)) {
    console.error('invalid action:',action);
  }
  switch(action) {
    case 'setRingAttribute': {
      const { ringId, attribute, value } = arg;
      curState.rings[ringId][attribute] = value;
      //console.log('curState', curState);
    } break;
    case 'setColor': {
      curState.colors = Colors(arg); 
    } break;
    case 'setTransition': {
      model.transitions[model.current] = arg; 
    } break;
    default : console.error('unknown action',action);
  }
  return {...model};
}

function verifyAction(model,action) {
  return true;
}

function verifyAttribute(attribute,value) {
  switch (attribute) {
    case 'length': {
      if (typeof value == 'number' && 0 <= value && value <= 1) return true;
    }
    case 'phase' : {
      if (typeof value == 'number' && 0 <= value && value <= 360) return true;
    }
    case 'freq' : {
      if (typeof value == 'number' && -2 <= value && value <= 2) return true;
    }
    default : console.error('unknown attribute:',attribute)
  }
  console.error('invalid attribute:',attribute,value);
}
