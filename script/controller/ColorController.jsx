// ColorController.jsx

export {
  ColorController,
};

import {
  Colors,
} from "../view/Colors.js";
import {
  StateReducerContext
} from "../model/model.js";

/*
 * need the control logic
 */
function ColorController(props) {
  const { myTheme } = props;
  const dispatch = React.useContext(StateReducerContext);
  const setColor = React.useCallback(() => {
    dispatch({
      type : 'colors',
      value : {
        inner : myTheme.inner,
        outer : myTheme.outer,
      }
    });
  },[dispatch,myTheme]);
  return (
    <div onClick={setColor}>
      <Colors myTheme={myTheme} />
    </div>
  );
}
