function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// script.jsx

/*
 * Test out a component which on click/pointer down sets some status
 * to "tracking" and keeps sending the mouse data to some submitted
 * callback.  Then try to extract this logic to a custom hook.  Then
 * try to start making components...
 *
 * note: mouse, pointer, touch
 * idea: on mouseMove check if (event.buttons > 0)
 */
function MouseTracker(props) {
  const nop = () => {};

  const moveCallback = props.moveCallback || nop;
  const wheelCallback = props.wheelCallback || nop;
  const triggerEvents = {
    onMouseDown: startTracking,
    onWheel: wheelCallback
  };
  const trackEvents = {
    'mousemove': track,
    'mouseup': finishTracking,
    'dragend': finishTracking
  };

  function track(event) {
    if (event.buttons == 0) {
      console.log('button finish');
      finishTracking();
    } else {
      console.count('track');
      moveCallback({
        x: event.pageX,
        y: event.pageY
      });
    }
  }

  function finishTracking() {
    console.log('finish tracking');

    for (let e in trackEvents) {
      window.removeEventListener(e, trackEvents[e]);
    }
  }

  function startTracking() {
    console.log('start tracking');

    for (let e in trackEvents) {
      window.addEventListener(e, trackEvents[e]);
    }
  }

  return React.createElement("div", _extends({
    draggable: "false"
  }, triggerEvents), props.children);
}

function ShowMouse(props) {
  const [pos, setPos] = React.useState({
    x: 0,
    y: 0
  });
  console.log('showMouse:', pos);
  const callbacks = {
    moveCallback: setPos,
    wheelCallback: e => {
      setPos({
        x: pos.x + e.deltaX,
        y: pos.y + e.deltaY
      });
    }
  };
  return React.createElement(MouseTracker, callbacks, React.createElement("p", null, "x: ", pos.x, ", y: ", pos.y));
}

ReactDOM.render(React.createElement("div", null, React.createElement(ShowMouse, null), React.createElement(ShowMouse, null)), document.getElementById('react-root'));
