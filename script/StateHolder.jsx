// StateHolder.jsx

export { 
  ReducerContext, 
  StateHolder 
};

/*
 * state = {
 *  rings : { id : { lengthPct, angle } }
 *  color : { inner : color, outer : color }
 * }
 */

const stateModel = {
  rings : {
    'ring0' : { length : 1, angle : 0 },
  },
  color : { 
    all : { inner : 'black', outer : 'black', },
  }
};

function verifyActionValue(attribute,value) {
  switch (attribute) {
    case 'length': {
      return typeof value == 'number' &&
             0 <= value && value <= 1;
    }
    case 'angle' : {
      return typeof value == 'number' &&
             0 <= value && value < Math.PI*2;
    }
    default : return true; // checking color values...
  }
}

function verifyAction(state, action) {
  if (action.type in state &&
      action.id in state[action.type] &&
      action.attribute in state[action.type][action.id] &&
      verifyActionValue(action.attribute,action.value)) {
    return true;
    }
  return false;
}

function reducer(state, action) {
  if (!verifyAction(action)) {
    console.error('bad action!', action, state);
  }
  state[action.type][action.id][action.attribute] = action.value;
  return state;
}

const ReducerContext = React.createContext(null);

function StateHolder(props) {
  const [state, dispatch] = React.useReducer(reducer, stateModel);
  return (
    <ReducerContext.Provider value={dispatch}>
      {props.children}
    </ReducerContext.Provider>
  );
}

