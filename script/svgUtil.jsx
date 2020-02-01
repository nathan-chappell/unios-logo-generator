// svgUtil.jsx

export {
  CalculatedPath,
  CirclePath,
  RadialLine,
};

function CalculatedPath(props, d) {
  return (
    <path d={d} className={props.className}>
      {props.children}
    </path>
    );
}

function CirclePath(props) {
  const { cx, cy, r } = props;
  let d = `M ${cx} ${cy - r}
           A ${r} ${r} 180 1 0 ${cx} ${cy + r}
           A ${r} ${r} 180 1 0 ${cx} ${cy - r}`
  return CalculatedPath(props,d);
}

function RadialLine(props) {
  const { cx, cy, angle, rStart, rStop } = props;
  const { sin, cos } = Math;
  let d = `M ${cx + rStart*cos(angle)} ${cy - rStart*sin(angle)}
           L ${cx + rStop*cos(angle)} ${cy - rStop*sin(angle)}`;
  //console.log('RadialLine d:',d, 'props:',props);
  return CalculatedPath(props,d);
}


