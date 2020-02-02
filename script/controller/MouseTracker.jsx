// MouseTracker.jsx

export {
  MouseTracker, 
  Centerer, 
  ShowMouse 
};

/*
 * Component wrapper that tracks the mouse and registers new positions
 * and wheels.
 * @prop.moveCallback callback for mouse onmove event
 * @prop.wheelCallback
 *    callback for mouse onwheel event
 */
function MouseTracker(props) {
  const nop = () => {};
  const moveCallback = props.moveCallback || nop;
  const wheelCallback = props.wheelCallback || nop;
  const className = props.className || 'MouseTracker';

  // events which start tracking, attached to the component
  const triggerEvents = {
    onMouseDown : startTracking,
    onWheel : wheelCallback
  };

  // events involved in tracking, attached to the window
  const trackEvents = {
    'mousemove' : track,
    'mouseup' : finishTracking,
    'dragend' : finishTracking,
  }

  function track(event) {
    // in case something happened and we didn't cancel tracking when
    // we were supposed to
    if (event.buttons == 0) {
      finishTracking();
    } else {
      moveCallback({x:event.clientX, y:event.clientY});
    }
  }

  function finishTracking() {
    //console.log('finish tracking');
    for (let e in trackEvents) {
      window.removeEventListener(e,trackEvents[e]);
    }
  }

  function startTracking() {
    //console.log('start tracking');
    for (let e in trackEvents) {
      window.addEventListener(e,trackEvents[e]);
    }
  }

  // ??? uncertain why draggable is necessary, but it seems to be
  return (
    <div draggable="false" {...triggerEvents} className={className}>
      {props.children}
    </div>
  )
}

function Centerer(props) {
  return (
    <div className="centerer">
      <div className="spacer"></div>
        {props.children}
      <div className="spacer"></div>
    </div>
  );
}

/*
 * Demo the mouse tracker
 */
function ShowMouse(props) {
  const [pos,setPos] = React.useState({x:0,y:0});
  //console.log('showMouse:', pos);
  const callbacks = {
    moveCallback : setPos,
    wheelCallback : (e) => {
      setPos({ x:(pos.x + e.deltaX), y:(pos.y + e.deltaY) });
    }
  }
  return (
    <MouseTracker {...callbacks}>
      <p>x: {pos.x}, y: {pos.y}</p>
    </MouseTracker>
  );
}
