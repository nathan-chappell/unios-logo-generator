# design.md

## data structures

### Model:
  1. [States]
  2. [Transitions]
  3. current

### State:
  1. name
  2. {Rings}
  3. Colors

### Ring:
  1. id : {length, phase, freq}

### Colors:
  1. {inner, outer}

### Transition:
  1. {begin, dur, Spline}

### Spline:
  1. {x1, y1, x2, y2}

## API:

* Model.getCurrentState: model -> state
* Model.getCurrentTransition: model -> transition
* Model.setCurrent: model, name -> model
* Model.addState: model -> model
* Model.removeState: model, name -> model

* State.setRing: state, id, ring -> state
* State.setColors: state, theme -> state
* State.setName: state, name -> state

* Transition.setBegin: transition, begin -> transition
* Transition.setDur: transition, dur -> transition
* Transition.setSpline: transition, spline -> transition

## Controllers:

* RingController
  * needs:
    * Rings from current state (for display)
    * callback (to modify ring)
  * updates:
    * self, preview
    
* RingControlPanel
  * needs:
    * Rings (for display)
    * callback (delegates to RingControllers)

* TransitionController
  * needs:
    * current transition (for display)
    * callback (to modify transition) 

* SplineController
  * needs:
    * spline from current transition
    * callback (to modify spline)

* IndexPanel
  * needs:
    * names of Rings (for display)
    * callbacks to:
        set current state
        add state
        remove state
        rename state

* ColorPanel
  * needs:
    * list/set of themes (for display)
    * callback (to modify current color)

## View
* (All controllers are implicitly viewers)

* LogoViewer
  * needs: [states],[transitions]
