// ControlPanel.jsx

export {
  ControlPanel,
};

import {
  RingController,
} from "../controller/RingController.js";

function ControlPanel(props) {
  const { rings, setRingAttribute } = props;
  const ringIds = Object.keys(rings);
  const controllers = ringIds.map(
    (ringId) => {
      let { length, phase, freq } = rings[ringId];
      return (
        <RingController key={ringId} ringId={ringId}
          length={length} phase={phase} freq={freq}
          setRingAttribute={setRingAttribute} />
      );
    });
  
  return (
      <div className="ControlPanel">
        {controllers}
      </div>
  );
}
