// util.js

export {
  toPct,
  clamp,
  roundDigits,
  rad2deg,
  deg2rad,
};

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
