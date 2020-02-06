// script.jsx

import {
  App
} from "./controller/App.js";

/*
 * NEXT:
 * export to svg 
 *    blob -> file or something
 * animations:
 *    stateChain: stateLink
 *    stateLink: state, next, transition
 * styling:
 *    make it more obvious what does what
 * static page generation:
 *    babel script:
 *      es6-modules + jsx => commonjs-modules + js
 *      ReactDOMServer that shit
 */

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('react-root')
);
