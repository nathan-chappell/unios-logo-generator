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
  verifyAttribute,
  maxFreq,
} from "../model/NewModel.js";

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

function getPhaseInputProps(setAttribute, value) {
  return {
    setValue : (val) => setAttribute('phase',val),
    verify : (val) => verifyAttribute('phase',val),
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

function getFreqInputProps(setAttribute, value) {
  return {
    setValue : (val) => setAttribute('freq',val),
    verify : (val) => verifyAttribute('freq',val),
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

function getLengthInputProps(setAttribute, value) {
  return {
    setValue : (val) => setAttribute('length',val),
    verify : (val) => verifyAttribute('length',val),
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

function getComponentProps(setAttribute, name, value) {
  const { model2comp, comp2model} = converters[name];
  return {
    value : model2comp(value),
    callback : (val) => setAttribute(name,comp2model(val)),
    fwdProps : { className : 'RingC' + name },
  };
}

function RingController(props) {
  const { length, phase, freq, ringId, setRingAttribute } = props;

  const setAttribute = React.useCallback((attribute,value) => {
    setRingAttribute({ ringId : ringId, attribute : attribute, value : value});
  }, [setRingAttribute,ringId]);

  return (
    <div className="RingC">
      <Dial {...getComponentProps(setAttribute,'phase',phase)} />
      <VerifiedInput {...getPhaseInputProps(setAttribute,phase)} />
      <Dial {...getComponentProps(setAttribute,'freq',freq)} />
      <VerifiedInput {...getFreqInputProps(setAttribute,freq)} />
      <Slider {...getComponentProps(setAttribute,'length',length)} />
      <VerifiedInput {...getLengthInputProps(setAttribute,length)} />
    </div>
  );
}
