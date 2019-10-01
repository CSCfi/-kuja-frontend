import React from "react";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import OpiskelijavuodetPerustelulomake from "../../../../../../../components/04-forms/muut/OpiskelijavuodetLomake/Vahimmaisopiskelijavuosimaara";
const PerustelutOpiskelijavuodet = props => {
  const sectionId = "perustelut_opiskelijavuodet";
  const { onChangesRemove, onChangesUpdate } = props;
  return (
    <React.Fragment>
      <ExpandableRowRoot
        anchor={sectionId}
        key={`expandable-row-root`}
        categories={[]}
        changes={R.path(["perustelut"], props.changeObjects)}
        disableReverting={false}
        hideAmountOfChanges={false}
        isExpanded={true}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}
        title={props.intl.formatMessage(wizardMessages.driverTraining)}
      >
        <OpiskelijavuodetPerustelulomake
          onChangesUpdate={onChangesUpdate}
          changeObjects={R.path(["perustelut"], props.changeObjects)}
        >
        </OpiskelijavuodetPerustelulomake>
      </ExpandableRowRoot>
    </React.Fragment>
  );
};

PerustelutOpiskelijavuodet.defaultProps = {
  changeObjects: {},
  stateObject: {}
};

PerustelutOpiskelijavuodet.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  lomakkeet: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};

export default injectIntl(PerustelutOpiskelijavuodet);
