// script/components/dial.jsx

export {
  Dial,
  DialInput,
};

function getAngle(e,boundingRect) {
  const { left, top, width, height } = boundingRect;
  const dx = e.clientX - (left + width/2);
  const dy = e.clientY - (top + height/2);
  return Math.atan2(-dy,dx);
}

function Dial(props) {
  const { angle, callback } = props;
  const [_angle, _setAngle] = React.useState(angle);
  const ref = React.useRef(null);
  const mouseDown = React.useCallback((e) => {
    function _handleMove(_e) {
      if (_e.buttons === 0) {
        window.removeEventListener('mousemove',_handleMove);
        return;
      }
      const angle = getAngle(_e,ref.current.getBoundingClientRect());
      _setAngle(angle);
      if (typeof callback === 'function') callback(angle);
    }

    function _handleUp(_e) {
      window.removeEventListener('mouseup',_handleUp);
    }

    window.addEventListener('mousemove',_handleMove);
    window.addEventListener('mouseup',_handleUp);
  },[ref.current,callback,_setAngle]);

  const r = .4;
  const deg = -180*_angle/Math.PI; 
  return (
    <svg viewBox="-.5 -.5 1 1" className="Dial">
      <circle cx="0" cy="0" r={r} ref={ref} onMouseDown={mouseDown}/>
      <line strokeLinecap="round" x1=".15" y1="0" x2={r} y2="0" 
            transform={`rotate(${deg})`}/>
    </svg>
  );
}

function DialInput(props) {
  const { angle, callback } = props;
  const [input, setInput] = React.useState({input:angle, angle:angle});
  function checkAndSet(value) {
    const input = {input:value, angle:angle};
    if (Number(value)) input.angle = Number(value);
    setInput(input);
  }
  return (
    <div className="DialInput">
      <Dial angle={angle} />
      <input angle={angle} cols={5} lines={1} maxLength={5} 
            onChange={checkAndSet} />
    </div>
  );
}
