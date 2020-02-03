// model.jsx

export { 
  reducer,
  stateModel,
  ReducerContext
};

const ReducerContext = React.createContext(null);

/*
 * state = {
 *  rings : { id : { lengthPct, angle } }
 *  color : { inner : color, outer : color }
 * }
 */

const stateModel = {
  rings : {
    ring0 : { length : 1, angle : 0 },
    ring1 : { length : 1, angle : 0 },
    ring2 : { length : 1, angle : 0 },
    ring3 : { length : 1, angle : 0 },
  },
  colors : { 
    inner : 'grey', 
    outer : 'black',
  },
};

Object.seal(stateModel);

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
  if (action.type == 'rings') {
    if (action.id in state['rings'] &&
        action.attribute in state['rings'][action.id] &&
        verifyActionValue(action.attribute,action.value)) {
      return true;
    }
  } else if (action.type == 'colors') {
    // verify color...
    if (typeof action.value.inner == 'string' &&
        typeof action.value.outer == 'string')
    return true;
  }
  return false;
}

function reducer(oldstate, action) {
  let state = {...oldstate};
  //console.log('reducer:',state,action);
  if (!verifyAction(state, action)) {
    console.error('bad action!', action, state);
    return;
  } else if (action.type == 'rings') {
    state[action.type][action.id][action.attribute] = action.value;
  } else if (action.type == 'colors') {
    state[action.type] = action.value;
  } else {
    throw new Error('unreachable');
  }
  return state;
}
