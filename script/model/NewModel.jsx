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

function Spline(x1,y1,x2,y2) {
  // default is 'ease'
  this.x1 = x1 ? x1 : .25;
  this.y1 = y1 ? y1 : .1;
  this.x2 = x2 ? x2 : .25;
  this.y2 = y2 ? y2 : 1;
}

function Transition(begin,dur,spline) {
	this.begin = begin ? begin : 0;
	this.dur = dur ? dur : 1;
	this.spline = spline ? spline : new Spline();
}

Colors.themes = {
  theme1 : { inner : 'black', outer : 'grey', },
  theme2 : { inner : 'magenta', outer : 'cyan', },
  theme3 : { inner : 'brown', outer : 'orange', },
  theme4 : { inner : 'red', outer : 'forestgreen', },
};

function Colors(theme) {
  console.log('colors:',theme,);
  if (!(theme in Colors.themes)) {
    console.error('invalid theme:', theme);
    theme = Object.keys(Colors.themes)[0];
  }
  return Colors.themes[theme];
}

const maxFreq = 2;

function Ring(length,phase,freq) {
	this.length = length ? length : 1;
	this.phase = phase ? phase : 0;
	this.freq = freq ? freq : 0;
}

const stateCounter = (() => { let i = 0; return ()=>{ i++; return i; }})();

function defaultRingSet() {
  const rings = {};
  for (let i = 1; i <= 4; ++i) rings['ring' + i] = new Ring();
  return rings;
}

function State(name,rings,colors) {
	this.name = name ? name : 'state' + stateCounter();
	this.rings = rings ? rings : defaultRingSet();
	this.colors = colors ? colors : 0;
}

function Model() {
  this.states = [new State()];
  this.transitions = [new Transition()];
  this.current = 0;
}

function updateModel(model,action) {
  const curState = model.states[model.current];
  switch(action.type) {
    case 'setRingAttribute': {
      const { ringId, attribute, value } = action.value;
      curState.rings[ringId][attribute] = value;
    }
    case 'setColor': curState.colors = Colors(action.theme);
    case 'setTransition': model.transitions[model.current] = action.transition;
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
