// ColorController.jsx

export {
  ColorController,
};

import {
  Colors,
} from "../view/Colors.js";
import {
  ReducerContext
} from "../model/model.js";

/*
 * need the control logic
 */
function ColorController(props) {
  const { theme } = props;
  console.log('CC:', theme);
  const dispatch = React.useContext(ReducerContext);
  const setColor = React.useCallback(() => {
    dispatch({
      type: 'color',
      id : 'all',
      inner : theme.inner,
      outer : theme.outer,
    });
  },[dispatch,theme]);
  return (
    <Colors theme={theme} onClick={setColor} />
  );
}
