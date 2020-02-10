import React, { useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { findAnchoredElement } from "../../../../../../../utils/common";
import commonMessages from "../../../../../../../i18n/definitions/common";
import Lomake from "../../../../../../../components/02-organisms/Lomake";
import { getRules as getVahimmaisRules } from "../../../../../../../services/lomakkeet/perustelut/opiskelijavuodet/vahimmais/rules";
import { getRules as getSisaoppilaitosRules } from "../../../../../../../services/lomakkeet/perustelut/opiskelijavuodet/sisaoppilaitos/rules";
import { getRules as getVaativaTukiRules } from "../../../../../../../services/lomakkeet/perustelut/opiskelijavuodet/vaativa/rules";

const PerustelutOpiskelijavuodet = props => {
  const intl = useIntl();
  const sectionId = "perustelut_opiskelijavuodet";
  const { onChangesRemove, onChangesUpdate, isReadOnly } = props;

  const valueChanges = useMemo(() => {
    return {
      vahimmaisopiskelijavuosimaara: findAnchoredElement(
        "opiskelijavuodet.vahimmaisopiskelijavuodet.A",
        props.changeObjects.opiskelijavuodet
      ),
      sisaoppilaitos: findAnchoredElement(
        "opiskelijavuodet.sisaoppilaitos.A",
        props.changeObjects.opiskelijavuodet
      ),
      vaativatuki: findAnchoredElement(
        "opiskelijavuodet.vaativatuki.A",
        props.changeObjects.opiskelijavuodet
      )
    };
  }, [props.changeObjects.opiskelijavuodet]);

  const differenceTitles = [
    intl.formatMessage(commonMessages.current),
    intl.formatMessage(commonMessages.applyFor),
    intl.formatMessage(commonMessages.difference)
  ];
  return (
    <React.Fragment>
      {valueChanges.vahimmaisopiskelijavuosimaara && (
        <ExpandableRowRoot
          anchor={`${sectionId}_vahimmaisopiskelijavuodet`}
          key={`expandable-row-root-vahimmaisopiskelijavuodet`}
          changes={props.changeObjects.perustelut.vahimmaisopiskelijavuodet}
          isExpanded={true}
          onChangesRemove={onChangesRemove}
          onUpdate={onChangesUpdate}
          title={"Vähimmäisopiskelijavuosimäärä"}>
          <Lomake
            anchor={`${sectionId}_vahimmaisopiskelijavuodet`}
            action="reasoning"
            changeObjects={
              props.changeObjects.perustelut.vahimmaisopiskelijavuodet
            }
            data={{
              checkboxItems: props.muutosperustelut,
              changeObject:
                valueChanges.vahimmaisopiskelijavuosimaara.properties,
              differenceTitles
            }}
            isReadOnly={isReadOnly}
            onChangesUpdate={onChangesUpdate}
            path={["perustelut", "opiskelijavuodet", "vahimmais"]}
            rulesFn={getVahimmaisRules}></Lomake>
        </ExpandableRowRoot>
      )}

      {valueChanges.sisaoppilaitos && (
        <ExpandableRowRoot
          anchor={`${sectionId}_sisaoppilaitos`}
          key={`expandable-row-root-sisaoppilaitos`}
          changes={props.changeObjects.perustelut.sisaoppilaitos}
          isExpanded={true}
          onChangesRemove={onChangesRemove}
          onUpdate={onChangesUpdate}
          title={"Sisäoppilaitosmuotoinen opetus"}>
          <Lomake
            action="reasoning"
            anchor={`${sectionId}_sisaoppilaitos`}
            changeObjects={props.changeObjects.perustelut.sisaoppilaitos}
            data={{
              changeObject: valueChanges.sisaoppilaitos.properties,
              differenceTitles
            }}
            isReadOnly={isReadOnly}
            onChangesUpdate={onChangesUpdate}
            path={["perustelut", "opiskelijavuodet", "sisaoppilaitos"]}
            rulesFn={getSisaoppilaitosRules}></Lomake>
        </ExpandableRowRoot>
      )}

      {valueChanges.vaativatuki && (
        <ExpandableRowRoot
          anchor={`${sectionId}_vaativatuki`}
          key={`expandable-row-root-vaativatuki`}
          changes={props.changeObjects.perustelut.vaativatuki}
          isExpanded={true}
          onChangesRemove={onChangesRemove}
          onUpdate={onChangesUpdate}
          title={"Vaativa koulutus"}>
          <Lomake
            action="reasoning"
            anchor={`${sectionId}_vaativatuki`}
            changeObjects={props.changeObjects.perustelut.vaativatuki}
            data={{
              changeObject: valueChanges.vaativatuki.properties,
              differenceTitles
            }}
            isReadOnly={isReadOnly}
            onChangesUpdate={onChangesUpdate}
            path={["perustelut", "opiskelijavuodet", "vaativatuki"]}
            rulesFn={getVaativaTukiRules}></Lomake>
        </ExpandableRowRoot>
      )}
    </React.Fragment>
  );
};

PerustelutOpiskelijavuodet.defaultProps = {
  changeObjects: {},
  muutosperustelut: [],
  isReadOnly: false
};

PerustelutOpiskelijavuodet.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  muutosperustelut: PropTypes.array,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  isReadOnly: PropTypes.bool
};

export default PerustelutOpiskelijavuodet;
