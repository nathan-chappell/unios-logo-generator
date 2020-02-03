// ControlPanel.jsx

export {
  ControlPanel,
};

import {
  RingController,
} from "../controller/RingController.js";

function ControlPanel(props) {
  const { rings } = props;
  const ringIds = Object.keys(rings);
  const controllers = ringIds.map(
    (ringId) => {
      let { length, angle } = rings[ringId];
      return (
        <RingController key={ringId} ringId={ringId}
          length={length} angle={angle} />
      );
    });
  
  return (
      <div className="ControlPanel">
        {controllers}
      </div>
  );
}
