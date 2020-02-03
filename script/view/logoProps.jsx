// logoProps.jsx

export {
  logoProps,
  themes,
};

// assume viewBox="-.5 -.5 1 1"

const innerStroke = .01;
const outerStroke = 4*innerStroke;

const logoProps = {
  radii : [2,4,6,8].map((v) => v*outerStroke),
  innerStroke : innerStroke,
  outerStroke : outerStroke,
};

const themes = {
  theme1 : { inner : 'black', outer : 'grey', },
  theme2 : { inner : 'magenta', outer : 'cyan', },
  theme3 : { inner : 'brown', outer : 'orange', },
  theme4 : { inner : 'red', outer : 'forestgreen', },
};
