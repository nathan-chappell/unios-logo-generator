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
  ERROR,
  expect_error,
  finish_expect_error,
  log_error,
  checkTypeByName,
  TypeName,
};

let ERROR = '';
let expect_error_count = 0;
function expect_error(n) {
  if (n == undefined) n = 1;
  expect_error_count += n;
}
function Expected() {
  return { name : 'Expected' };
}
function log_error() {
  if (expect_error_count) {
    --expect_error_count;
    // once the expect_error_count reaches 0, throw an expected
    if (!expect_error_count) throw Expected();
  }
  console.error('STORE - ',ERROR,...arguments);
}
function finish_expect_error() {
  if (expect_error_count) {
    ERROR = 'EXPECT_ERROR_COUNT';
    count = expect_error_count;
    expect_error_count = 0;
    log_error(count);
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
      ERROR = 'CHECK_TYPE_UNDEFINED_PROPERTY';
      log_error(property,obj);
      return false;
    }
    if (typeof obj[property] != Type[property].type) {
      ERROR = 'CHECK_TYPE_INVALID_TYPE';
      log_error(property,obj);
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
  const newStore = new Map(store);
  ERROR = '';
  switch(type) {
    case undefined: 
      ERROR = 'ACTION_TYPE_UNDEFINED'
      log_error(action);
      break;
    case 'ADD_RING':
      const { ring } = payload;
      if (CHECK_TYPE && !checkTypeByName(ring,'ring')) {
        ERROR = 'ADD_RING_TYPE'
        log_error(action);
        return store;
      } else {
        newStore.set(getID(),{...ring, ...{type:RingType[TypeName]}});
      }
  }
  return newStore;
}
