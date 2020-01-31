// script/util.js

// percentage converter
function toPct(v) {
  switch (typeof v) {
    case 'number': return `${Math.floor(10000*v)/100}%`;
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

function clamp(min,val,max) {
  return val < min ? min : val > max ? max : val;
}

export { toPct, clamp };
