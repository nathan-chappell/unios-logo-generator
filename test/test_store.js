// test/test_store.js

export {
  test_store,
};

import {
  set_CHECK_TYPE,
  expect_error,
  finish_expect_error,
  log_error,
  checkTypeByName,
  reducer,
} from "../js/Store.js"

set_CHECK_TYPE(true);

function verify_store(store) {
  let is_valid = true;
  for ([k,v] of store) {
    if (!checkTypeByName(v,v.type)) {
      log_error(v);
      is_valid = false;
    }
  }
  return is_valid;
}

function compare_store(store1,store2) {
}

function test_ADD_RING() {
  let store = new Map();
  let newStore;
  expect_error();
  try {
    let newStore = reducer(store,{});
  } catch(error) {
    if (error.name != 'Expected') throw error;
  } finally {
    finish_expect_error();
  }
  verify_store(store);
}

function test_store() {
  test_ADD_RING();
  console.log('test_store complete');
}
