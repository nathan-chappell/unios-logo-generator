// transitions.jsx

export {
  TransitionDiagram,
  getTransitionModel,
  TransitionReducerContext,
  transitionReducer,
};

const TransitionReducerContext = React.createContext(null);

function getTransitionModel() {
  // default spline is 'ease'
  return {
    spline : {x1 : .25, y1 : .1, x2 : .25, y2 : 1},
    dur : 1,
    begin : 0,
  };
};

function TransitionDiagram() {
  console.log('creating new diagram');
  this.states = [];
  this.transitions = [getTransitionModel()];
  this.cur = 0;

  this.setState = (state) => this.states[this.cur] = state;
  this.setTransition = (transition) => this.transitions[this.cur] = transition;
  this.addElement = () => {
    states.splice(cur+1,0,getStateModel());
    transitions.splice[cur+1,0,getTransitionModel()];
  }
  this.setCur = (cur) => this.cur = cur;

  //function getCurTransition() { return this.transitions[this.cur]; }
  this.getCurTransition = () => this.transitions[this.cur];
  //this.getCurTransition = getCurTransition.bind(this);
  this.setSpline = (spline) => this.transitions[this.cur].spline = spline;
}

//const transitionDiagram = new TransitionDiagram();

function verifyTransitionAction(action) {
  return true;
}

function transitionReducer(olddiagram, action) {
  const diagram = {...diagram};
  switch(action.type) {
    case 'setSpline': {
      diagram.setSpline(action.value);
    }
    default : console.warn('I do not know what im doing');
  }
  return diagram;
}
