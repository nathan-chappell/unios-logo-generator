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
  _ID,
} from "../util/util.js";
import {
  Slider,
} from "../view/Slider.js";
import {
  Dial,
} from "../view/Dial.js";
import {
  verifyActionValue,
  ReducerContext,
  maxFreq,
} from "../model/model.js";

function VerifiedInput(props) {
  const {verify, setValue, fwdProps} = props;
  const [invalid,setInvalid] = React.useState(null);

  function inputChange(e) {
    const value = e.target.valueAsNumber;
    if (verify(value)) {
      if (invalid) {
        setInvalid(null);
      }
      setValue(value);
    } else {
      //console.log('bad value:', value);
      setInvalid({value : event.target.value});
    }
  }

  if (invalid) {
    inputProps.className += ' InputError';
    inputProps.value = invalid.value;
  }

  return <input {...fwdProps} onChange={inputChange}/>;
}

/*
 * input should reflect model value,
 * the geometric component may require conversion
 */

function getPhaseInputProps(_dispatch, value) {
  return {
    setValue : (val) => _dispatch('phase',val),
    verify : (val) => verifyActionValue('phase',val),
    fwdProps : {
      value : roundDigits(value,1),
      min : 0,
      max : 360,
      type : 'number',
      step : .1,
      className : 'RingCphaseI',
    }
  };
}

function getFreqInputProps(_dispatch, value) {
  return {
    setValue : (val) => _dispatch('freq',val),
    verify : (val) => verifyActionValue('freq',val),
    fwdProps : {
      value : roundDigits(value,2),
      min : -maxFreq,
      max : maxFreq,
      type : 'number',
      step : .01,
      className : 'RingCfreqI',
    }
  };
}

function getLengthInputProps(_dispatch, value) {
  return {
    setValue : (val) => _dispatch('length',val),
    verify : (val) => verifyActionValue('length',val),
    fwdProps : {
      value : roundDigits(value,3),
      min : 0,
      max : 1,
      type : 'number',
      step : .001,
      className : 'RingClengthI',
    }
  };
}

const converters = {
  'phase' : { model2comp : _ID, comp2model : _ID },
  'length' : { model2comp : _ID, comp2model : _ID },
  'freq' : { model2comp : freq2deg, comp2model : deg2freq },
}

function getComponentProps(_dispatch, name, value) {
  const { model2comp, comp2model} = converters[name];
  return {
    value : model2comp(value),
    callback : (val) => _dispatch(name,comp2model(val)),
    fwdProps : { className : 'RingC' + name },
  };
}

function RingController(props) {
  const { length, phase, freq, ringId} = props;
  const dispatch = React.useContext(ReducerContext);

  const _dispatch = React.useCallback((attribute,value) => {
    dispatch({
      type : 'rings',
      id : ringId,
      attribute : attribute,
      value : value,
    });
  },[dispatch,ringId]);

  return (
    <div className="RingC">
      <Dial {...getComponentProps(_dispatch,'phase',phase)} />
      <VerifiedInput {...getPhaseInputProps(_dispatch,phase)} />
      <Dial {...getComponentProps(_dispatch,'freq',freq)} />
      <VerifiedInput {...getFreqInputProps(_dispatch,freq)} />
      <Slider {...getComponentProps(_dispatch,'length',length)} />
      <VerifiedInput {...getLengthInputProps(_dispatch,length)} />
    </div>
  );
}
