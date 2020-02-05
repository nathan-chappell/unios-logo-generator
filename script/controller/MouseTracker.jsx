// MouseTracker.jsx

export {
  mouseTracker, 
};

/*
 * Component wrapper that tracks the mouse and registers new positions
 * and wheels.
 * @prop.moveCallback callback for mouse onmove event
 *    callback for mouse onwheel event
 */
function mouseTracker(ref,callback) {
  // events which start tracking, attached to the component
  const triggerEvents = {
    'mousedown' : startTracking,
  };

  for (let e in triggerEvents) {
    if (!ref.current) {
      console.warn('MT: no current');
      break;
    }
    ref.current.addEventListener(e,triggerEvents[e]);
  }

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
      callback({x:event.clientX, y:event.clientY});
    }
  }

  function finishTracking() {
    //console.log('finish tracking');
    for (let e in trackEvents) {
      window.removeEventListener(e,trackEvents[e]);
    }
  }

  function startTracking(event) {
    track(event);
    //console.log('start tracking');
    for (let e in trackEvents) {
      window.addEventListener(e,trackEvents[e]);
    }
  }
}

/*
 * Demo the mouse tracker
 * (uses old interface)
 */
/*
function ShowMouse(props) {
  const [pos,setPos] = React.useState({x:0,y:0});
  //console.log('showMouse:', pos);
  const callbacks = {
    callback : setPos,
  }
  return (
    <MouseTracker {...callbacks}>
      <p>x: {pos.x}, y: {pos.y}</p>
    </MouseTracker>
  );
}
*/
