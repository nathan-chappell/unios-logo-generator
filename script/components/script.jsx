import {
  Index,
} from "./index.js";
import {
  Dial,
  DialInput,
} from "./dial.js";

const items = [0,1,2,3].map((i) => ({text:i}));

function dispatch(item) { console.log('dispatch:',item); }

ReactDOM.render(
  <div>
    <Index itemList={items} callback={dispatch}/>
    <Dial angle={Math.PI/4} />
    <DialInput angle={Math.PI} />
  </div>,
  document.getElementById('react-root')
);
