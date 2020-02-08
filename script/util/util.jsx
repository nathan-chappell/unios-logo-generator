// util.jsx

export {
  toPct,
  clamp,
  roundDigits,
  rad2deg,
  deg2rad,
  freq2deg,
  deg2freq,
  getCircle_d,
  getOuterPathID,
  getOuterRotationID,
  addClassName,
  _ID,
};

const randId = (() => {
  let base = Math.floor(Math.random()*10**6);
  return () => { return ++base; };
})();

function _ID(x) { return x; }

function addClassName(props,className) {
  if (!props.className) {
    props.className = '';
  }
  props.className += ' ' + className;
}

function getOuterRotationID(ringId) {
  return `${ringId}.Rotation`;
}

function getOuterPathID(ringId) {
  return `${ringId}.OuterPath`;
}

function getCircle_d(length,r) {
  // annoying special case for full circle
  length = Math.min(.999999999, length);
  const longSweepFlag = length >= .5 ? 1 : 0;
  const deg = 360*length;
  const rad = deg2rad(deg);
  return `M ${r} ${0}
          A ${r} ${r} ${deg} ${longSweepFlag} 0 
            ${r*Math.cos(rad)} ${-r*Math.sin(rad)}`
}

function clamp(min,val,max) {
  return val < min ? min : val > max ? max : val;
}

function roundDigits(x,d) {
  return Math.round(x*10**d)/10**d;
}

function deg2rad(deg) {
  return deg*Math.PI/180;
}

function rad2deg(rad) {
  return rad*180/Math.PI;
}

// maxFreq : rotations per second
const maxFreq = 1;

function freq2deg(freq) {
  freq = freq >= 0 ? freq : maxFreq*2 + freq;
  return freq*180/maxFreq;
}

function deg2freq(deg) {
  deg = deg > 180 ? deg-360 : deg;
  return maxFreq*deg / 180
}

// percentage converter
function toPct(v) {
  switch (typeof v) {
    case 'number': return `${roundDigits(v,3)*100}%`;
    case 'object' : {
      let x = {};
      for (let key in v) {
        x[key] = toPct(v[key]);
      }
      return x;
    }
    default : return v;
  }
}
