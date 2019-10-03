import React, {useMemo} from "react";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake
  from "../../../../../../../components/04-forms/muut/OpiskelijavuodetLomake/Vahimmaisopiskelijavuosimaara";
import OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake
  from "../../../../../../../components/04-forms/muut/OpiskelijavuodetLomake/SisamuotoinenOpetus";
import OpiskelijavuodetVaativaKoulutusPerustelulomake
  from "../../../../../../../components/04-forms/muut/OpiskelijavuodetLomake/VaativaKoulutus";
import {getAnchorPart} from "../../../../../../../utils/common";

const filterChanges = (anchor, changeObjects = []) => {
    return R.filter(changeObj => {
      return R.equals(
        getAnchorPart(changeObj.anchor, 1),
        anchor
      )
    })(changeObjects)
}

const PerustelutOpiskelijavuodet = props => {
  const sectionId = "perustelut_opiskelijavuodet";
  const { onChangesRemove, onChangesUpdate } = props;

  const changesByLimitations = useMemo( () => {
    return {
      vahimmaisopiskelijavuosimaara: filterChanges(
        "vahimmaisopiskelijavuodet", R.path(["perustelut", "vahimmaisopiskelijavuosimaara"], props.changeObjects)),
      sisaoppilaitos: filterChanges("sisaoppilaitos", R.path(["perustelut", "sisaoppilaitosmuotoinenopetus"], props.changeObjects)),
      vaativatuki: filterChanges("vaativatuki", R.path(["perustelut", "vaativakoulutus"], props.changeObjects))
    }
  },[props.changeObjects.perustelut])

  return (
    <React.Fragment>
      { changesByLimitations.vahimmaisopiskelijavuosimaara &&
      <ExpandableRowRoot
        anchor={`${sectionId}_vahimmaisopiskelijavuosimaara`}
        key={`expandable-row-root-vahimmaisopiskelijavuosimaara`}
        changes={changesByLimitations.vahimmaisopiskelijavuosimaara}
        isExpanded={true}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}
        title={"Vähimmäisopiskelijavuosimäärä"}
      >
        <OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake
          onChangesUpdate={onChangesUpdate}
          changeObjects={changesByLimitations.vahimmaisopiskelijavuosimaara}
          sectionId={`${sectionId}_vahimmaisopiskelijavuosimaara`}
        >
        </OpiskelijavuodetVahimmaisopiskelijavuosimaaraPerustelulomake>
      </ExpandableRowRoot> }

      { changesByLimitations.sisaoppilaitos &&
      <ExpandableRowRoot
        anchor={`${sectionId}_sisaoppilaitosmuotoinenopetus`}
        key={`expandable-row-root-sisaoppilaitosmuotoinenopetus`}
        changes={changesByLimitations.sisaoppilaitos}
        isExpanded={true}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}
        title={'Sisäoppilaitosmuotoinen opetus'}
      >
        <OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake
          onChangesUpdate={onChangesUpdate}
          changeObjects={changesByLimitations.sisaoppilaitos}
          sectionId={`${sectionId}_sisaoppilaitosmuotoinenopetus`}
        >
        </OpiskelijavuodetSisaoppilaitosmuotoinenOpetusPerustelulomake>
      </ExpandableRowRoot> }

      { changesByLimitations.vaativatuki &&
      <ExpandableRowRoot
        anchor={`${sectionId}_vaativakoulutus`}
        key={`expandable-row-root-vaativakoulutus`}
        changes={changesByLimitations.vaativatuki}
        isExpanded={true}
        onChangesRemove={onChangesRemove}
        onUpdate={onChangesUpdate}
        title={'Vaativa koulutus'}
      >
        <OpiskelijavuodetVaativaKoulutusPerustelulomake
          onChangesUpdate={onChangesUpdate}
          changeObjects={changesByLimitations.vaativatuki}
          sectionId={`${sectionId}_vaativakoulutus`}
        >
        </OpiskelijavuodetVaativaKoulutusPerustelulomake>
      </ExpandableRowRoot> }
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
