import React, { useState } from "react";
import PropTypes from "prop-types";
import arrow from "static/images/koulutusala-arrow.svg";
import { Arrow } from "utils/UIComponents";
import Slot from "../../00-atoms/Slot/Slot";

const ExpandableRow = props => {
  const [state, setState] = useState({
    shouldBeExpanded: props.shouldBeExpanded
  });

  const toggle = () => {
    setState({
      shouldBeExpanded: !state.shouldBeExpanded
    });
  };

  return (
    <div>
      <div
        onClick={toggle}
        className="flex items-center cursor-pointer bg-grey-light hover:bg-grey p-2"
      >
        <span className="pl-4 pr-4">
          <Arrow
            src={arrow}
            alt={state.shouldBeExpanded ? "Kutista rivi" : "Laajenna rivi"}
            rotated={state.shouldBeExpanded}
          />
        </span>
        <div className="flex-1">
          <Slot slot="title">{props.children}</Slot>
        </div>
        <Slot slot="info">{props.children}</Slot>
      </div>
      {state.shouldBeExpanded && <Slot slot="content">{props.children}</Slot>}
    </div>
  );
};

ExpandableRow.propTypes = {
  categories: PropTypes.array,
  changes: PropTypes.array,
  code: PropTypes.string,
  onChanges: PropTypes.func,
  shouldBeExpanded: PropTypes.bool
};

export default ExpandableRow;
