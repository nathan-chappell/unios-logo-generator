// jsx/Store.jsx
// 
// This is the "store" for the application.
// The basic structure is a Map with entries of the form:
//
//    [id, data]
//
// Each data element is of the form
// { type: String, data: Object }

export {
  reducer,
  set_CHECK_TYPE,
  set_THROW_ERROR,
  log_error,
  checkTypeByName,
  TypeName,
};

let THROW_ERROR = false;
function set_THROW_ERROR(value) {
  THROW_ERROR = value;
}
function log_error(name,message) {
  if (THROW_ERROR) {
    const error = new Error(message);
    error.name = name;
    throw error;
  } else {
    console.error('STORE - ',name,message);
  }
}

/*
 * Type Checking utilities
 * The following is for "dynamic type checking."  It will be used by
 * the reducer to check actions passed to it.
 */

function checkType(Type,obj) {
  for (property in Type) {
    if (obj[property] === undefined) {
      log_error(
        'CHECK_TYPE',
        `${Type[TypeName]}.${property} is undefined`
      );
      return false;
    }
    const obj_prop_type = typeof obj[property];
    const type_prop_type = typeof Type[property].type;
    if (obj_prop_type != type_prop_type) {
      log_error(
        'CHECK_TYPE',
        `${Type[TypeName]}.${property} is type ${type_prop_type},` +
        `got type ${obj_prop_type}`
      );
      return false;
    }
  }
  return true;
}

// Types:

const TypeName = Symbol();

const LogoType = {
  [TypeName] : 'logo',
  rings : { type : 'object' /* [id] */ }
}
//
// ** The ids of logo.rings should be ids of rings
//
const RingType = {
  [TypeName] : 'ring',
  length      : { type : 'number' },
  radius      : { type : 'number' },
  phase       : { type : 'number' },
  velocity    : { type : 'number' },
  color       : { type : 'string' },
  strokeWidth : { type : 'number' },
};
const TransitionType = {
  [TypeName] : 'transition',
  dur    : { type : 'number' },
  from   : { type : 'number' /* id */}, 
  to     : { type : 'number' /* id */},
  spline : { type : 'number' /* id */},
  begin  : { type : 'number' /* id */},
};
const BeginType = {
  [TypeName] : 'begin',
  id     : { type : 'number' /* id */},
  event  : { type : 'number' /* see below */}, 
  offset : { type : 'number' /* id */},
};
//
// ** transition.from and transition.to should be logos with
//      "compatible" ring arrays
// ** transition.begin:
//      id : #href      => event in ["click", "hover"]
//      id : transition => event is "end"
//
const SplineType = {
  [TypeName] : 'spline',
  x1 : { type : 'number' },
  y1 : { type : 'number' },
  x2 : { type : 'number' },
  y2 : { type : 'number' },
};

// Type list:
// logo, ring, transition, begin, spline

function checkTypeByName(obj,type) {
  switch (type) {
    case 'logo': 
      return checkType(obj,LogoType);
    case 'ring': 
      return checkType(obj,RingType);
    case 'transition': 
      return checkType(obj,TransitionType);
    case 'begin': 
      return checkType(obj,BeginType);
    case 'spline': 
      return checkType(obj,SplineType);
  }
}

const getID = (() => {
  let i = Math.floor(Math.random()*10**8)
  return () => { return ++i };
})();

let CHECK_TYPE = true;
function set_CHECK_TYPE(val) {
  CHECK_TYPE = val;
}

function reducer(store,action) {
  const { type, payload } = action;
  if (typeof payload === 'undefined') {
    log_error('REDUCER','action.payload is undefined');
    return store;
  }
  const newStore = new Map(store);
  switch(type) {
    case undefined: 
      log_error('REDUCER','action.type is undefined');
      break;
    case 'ADD_RING':
      const { ring } = payload;
      if (CHECK_TYPE && !checkTypeByName(ring,'ring')) {
        log_error('REDUCER.ADD_RING','type check failed');
        return store;
      } else {
        newStore.set(getID(),{...ring, ...{type:RingType[TypeName]}});
      }
  }
  return newStore;
}
