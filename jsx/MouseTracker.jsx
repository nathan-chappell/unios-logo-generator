// components/MouseTracker.jsx

function _D() {console.log("DEBUG",...arguments);}

export {
  useMouseTracker,
};

function TrackAction(type,event) {
  return {
    type : type,
    payload : event,
  };
}

function useMouseTracker(props) {
  const { ref, dispatch } = props;
  function trackMove(event) {
    if (event.buttons == 0) {
      trackFinish(event);
    } else {
      dispatch(TrackAction('trackMove',event));
    }
  }
  function trackFinish(event,fromMouseUp) {
    _D('trackFinish',ref);
    dispatch(TrackAction('trackFinish',event));
    window.removeEventListener('mousemove',trackMove);
    window.removeEventListener('mouseup',trackFinish);
    window.removeEventListener('blur',trackFinish);
  }
  function trackStart(event) {
    _D('trackStart',ref);
    dispatch(TrackAction('trackStart',event));
    window.addEventListener('mousemove',trackMove);
    window.addEventListener('mouseup',trackFinish);
    window.addEventListener('blur',trackFinish);
  }
  function detach() {
    //_D('detach',ref);
    ref.current.removeEventListener('mousedown', trackStart);
  }
  function attach() {
    //_D('attach',ref);
    ref.current.addEventListener('mousedown', trackStart);
    return detach;
  }

  React.useEffect(attach,[dispatch,ref.current]);
}
