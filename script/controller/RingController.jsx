// RingController.jsx

export { 
  RingController
};

import {
  clamp,
  roundDigits,
  deg2rad,
  rad2deg,
  freq2deg,
  deg2freq,
} from "../util/util.js";
import {
  Slider,
} from "../view/Slider.js";
import {
  Dial,
} from "../view/Dial.js";
import {
  verifyActionValue,
  ReducerContext
} from "../model/model.js";

/*
 * getValFromControl => controlVal2ModelVal =>
 * modelVal2ControlVal =>
 */

function ControlFragment(
  action,
  props,
  inputProps,
  converters
) {
  const {value, name, Component } = props;
  const {model2component, component2model } = converters;
  const dispatch = React.useContext(ReducerContext);
  const ref = React.useRef(null);
  const [invalid,setInvalid] = React.useState(null);

  function _setVal(x) {
    dispatch({ ...action, value : x, });
  };

  const callback = React.useCallback((pos) => {
    _setVal(component2model(Component.getValFromRef(ref,pos)));
  },[ref.current]);

  function inputChange(e) {
    const _value = e.target.valueAsNumber;
    if (verifyActionValue(action.attribute,_value)) {
      if (invalid) {
        setInvalid(null);
      }
      _setVal(_value);
    } else {
      console.log('bad _value:', _value);
      setInvalid({value : event.target.value});
    }
  }

  action.type = 'rings';
  inputProps.type = 'number';
  inputProps.className = 'RingC' + name + 'Input';
  if (invalid) {
    inputProps.className += ' InputError';
    inputProps.value = invalid.value;
  }

  return (
    <>
      <Component ref={ref} value={model2component(value)} 
                 callback={callback} />
      <input {...inputProps} onChange={inputChange}/>
    </>
  );
}

/*
 * input should reflect model value,
 * the geometric component may require conversion...
 */

//const _ID = (x) => x;
const _ID = (x) => {
  return x;
}

function RingController(props) {
  const { length, phase, freq, ringId} = props;
  const dialRef = React.useRef(null);
  const dispatch = React.useContext(ReducerContext);

  const lengthControls = ControlFragment(
    { id : ringId, attribute : 'length' },
    { value : length, name : 'SliderLength', Component : Slider },
    { value : length, min : 0, max : 1, step : .001, },
    { model2component : _ID, component2model : _ID, }
  );

  const phaseControls = ControlFragment(
    { id : ringId, attribute : 'phase'},
    { value : phase, name : 'DialPhase', Component : Dial, },
    { value : roundDigits(phase,1), min : 0, max : 360, step : .1, },
    { model2component : _ID, component2model : _ID, }
  );

  const freqControls = ControlFragment(
    { id : ringId, attribute : 'freq'},
    { value : freq, name : 'DialFreq', Component : Dial, },
    { value : freq, min : -2, max : 2, step : .01, },
    { model2component : freq2deg, component2model : deg2freq, }
  );

  return (
    <div className="RingC">
      {lengthControls}
      {phaseControls}
      {freqControls}
    </div>
  );
}
