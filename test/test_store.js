// test/test_store.js

export {
  test_store,
};

import {
  set_CHECK_TYPE,
  set_THROW_ERROR,
  log_error,
  checkTypeByName,
  reducer,
} from "../js/Store.js"

function errorIsExpected(test,error) {
  //console.warn('EXERR',test.expectedError,error);
  return (test.expectedError && test.expectedError == error.name);
}

// common setUp tearDown
function UnitTest(name,setUp,tearDown) {
  const nop = () => {};
  this.name = name;
  this.tests = [];
  this.results = [];
  this.setUp = setUp ? setUp : nop;
  this.tearDown = tearDown ? tearDown : nop;
  this.addTests = addTests.bind(this);
  this.runTest = runTest.bind(this);
  this.publishResults = publishResults.bind(this);

  this.runTests = () => {
    for (let test of this.tests) {
      this.runTest(test);
    }
    this.publishResults();
  }

  function addTests() {
    for (let test of arguments) this.tests.push(test);
  }

  function runTest(test) {
    let context = {};
    this.setUp(context);
    let result;
    try {
      let testResult = test.run(context);
      result = {
        type: 'SUCCESS', 
        payload: {test: test, result: testResult},
      };
    } catch(error) {
      let {name,message} = error;
      if (errorIsExpected(test,error)) {
        result = {
          type: 'SUCCESS',
          payload: {test: test, result: `${name}: ${message}`},
        };
      } else {
        result = {
          type: 'FAILURE',
          payload: {test: test, result: `${name}: ${message}`},
        };
      }
    }
    this.tearDown(context);
    this.results.push(result);
  }

  function publishResults() {
    console.log('Unit Test:',this.name);
    for (let result of this.results) {
      const { type, payload } = result;
      console.log(
        'TEST', 
        type, '-', 
        payload.test.name.padEnd(20), '|', 
        payload.result
      );
    }
  }
}

function verify_store(store) {
  let is_valid = true;
  for ([k,v] of store) {
    if (!checkTypeByName(v,v.type)) {
      log_error('VERIFY_STORE','verification failed');
      is_valid = false;
    }
  }
  return is_valid;
}

function compare_store(store1,store2) {
}

const TestEmptyAction = new UnitTest('Empty Action');
TestEmptyAction.addTests(
  { name: 'missing type',
    run: function(context) { 
      reducer(new Map(),{ payload: '' }); 
    },
    expectedError: 'REDUCER',
  },
  { name: 'missing payload',
    run: function(context) { 
      reducer(new Map(), { type: '' });
    },
    expectedError: 'REDUCER',
  },
);

function test_store() {
  set_CHECK_TYPE(true);
  set_THROW_ERROR(true);
  TestEmptyAction.runTests();
  console.log('test_store complete');
}
