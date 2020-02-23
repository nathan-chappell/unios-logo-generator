#!/bin/bash
# make_test.sh

echo "make_test.sh"

JS_DIR="./js"
IMPORT_DIR="../js"
if [ ! -d "${JS_DIR}" ]; then 
  echo "Cannot find JS_FILE"
  exit -1
fi

TEST_FILE="test/test.jsx"
echo "creating test script: $TEST_FILE from $JS_DIR"

test_component_list=""

add_to_file() {
  echo "$1" >> $TEST_FILE
}

make_svg_component_test() {
  echo "making test for: '$1'"
  COMPONENT=$(echo $1 | sed 's$.*/\(\w*\).js$\1$')
  TEST_COMPONENT="TEST_${COMPONENT}"
  test_component_list+=" $TEST_COMPONENT"
  add_to_file "
import {
  $COMPONENT
} from '${IMPORT_DIR}/${1##*/}';

function $TEST_COMPONENT() {
  const svgRef = React.useRef(null);
  const [value,setValue] = React.useState(null);
  function logCallback(value) {
    console.log('callback: $COMPONENT, value:',value);
  }
  const callback = React.useCallback(logCallback,[setValue]);
  return (
    <svg viewBox='0 0 1 1' ref={svgRef}>
      <$COMPONENT value={value} svgRef={svgRef} callback={setValue} />
    </svg>
  );
}
"
}


make_component_test() {
  echo "making test for: '$1'"
  COMPONENT=$(echo $1 | sed 's$.*/\(\w*\).js$\1$')
  TEST_COMPONENT="TEST_${COMPONENT}"
  test_component_list+=" $TEST_COMPONENT"
  add_to_file "
import {
  $COMPONENT
} from '${IMPORT_DIR}/${1##*/}';

function $TEST_COMPONENT() {
  const [value,setValue] = React.useState(null);
  function logCallback(value) {
    console.log('callback: $COMPONENT, value:',value);
  }
  const callback = React.useCallback(logCallback,[setValue]);
  return <$COMPONENT value={value} callback={setValue} />
}
"
}

make_render() {
  echo "adding ReactDOM.render()..."
  add_to_file "
ReactDOM.render(
  <div>"
  for test_component in ${test_component_list}; do
    add_to_file "    <div className=\"test-wrapper\">
      <${test_component} />
    </div>"
  done
  add_to_file "  </div>,
  document.getElementById('react-root')
);
"
}

add_test_store() {
  echo "adding test_store..."
  echo "
import {
  test_store,
} from './test_store.js';

test_store();
" >> ${TEST_FILE}
}

echo "// test generated: $(date)" > ${TEST_FILE}

for file in ${JS_DIR}/*.js; do
  if grep -qe "#TESTABLE COMPONENT" ${file}; then
    make_component_test "${file}"
  elif grep -qe "#SVG_TESTABLE COMPONENT" ${file}; then
    make_svg_component_test "${file}"
  fi
done

make_render
add_test_store
babel --presets @babel/react ${TEST_FILE} -o ${TEST_FILE/jsx/js}

