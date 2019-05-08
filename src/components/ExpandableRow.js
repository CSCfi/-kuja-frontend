import React, { useState } from "react";
import { Arrow } from "utils/UIComponents";
import arrow from "static/images/koulutusala-arrow.svg";
import PropTypes from "prop-types";
import ExpandableRowContent from "components/ExpandableRowContent";
import { COLORS } from "modules/styles";

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
          {props.code && <span className="pr-6">{props.code}</span>}
          <span>{props.title}</span>
        </div>
        {props.changes && props.changes.length ? (
          <div>
            Muutokset:&nbsp;
            <span color={COLORS.OIVA_PURPLE}>{props.changes.length}</span>
          </div>
        ) : null}
      </div>
      {state.shouldBeExpanded && (
        <ExpandableRowContent>{props.children}</ExpandableRowContent>
      )}
    </div>
  );
};

ExpandableRow.propTypes = {
  categories: PropTypes.array,
  changes: PropTypes.array,
  code: PropTypes.string,
  onChanges: PropTypes.func,
  shouldBeExpanded: PropTypes.bool,
  title: PropTypes.string
};

export default ExpandableRow;
