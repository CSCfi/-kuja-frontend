import React, { useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
import Opiskelijavuodet from "../components/Opiskelijavuodet";
import { injectIntl } from "react-intl";
import commonMessages from "../../../../../../i18n/definitions/common";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import * as R from "ramda";

const getApplyFor = (categoryName, items) => {
  return (
    (
      R.find(value => {
        return value.kategoria === categoryName;
      }, items || []) || {}
    ).arvo || 0
  );
};

const isInLupa = (areaCode, items) => {
  return !!R.find(obj => {
    return obj.koodiarvo === areaCode;
  }, items);
};

const MuutospyyntoWizardOpiskelijavuodet = React.memo(props => {
  // const sectionId = "opiskelijavuodet";
  const heading = props.intl.formatMessage(wizardMessages.header_section4);
  const [headingNumber, setHeadingNumber] = useState(0);
  const [isVaativaTukiVisible, setIsVaativaTukiVisible] = useState(false);
  const [isSisaoppilaitosVisible, setIsSisaoppilaitosVisible] = useState(false);
  const [applyFor, setApplyFor] = useState(0);
  const [applyForVaativa, setApplyForVaativa] = useState(0);
  const [applyForSisaoppilaitos, setApplyForSisaoppilaitos] = useState(0);
  const [initialValue, setInitialValue] = useState(0);
  const [initialValueVaativa] = useState(0);
  const [initialValueSisaoppilaitos] = useState(0);

  useEffect(() => {
    const relevantChangesOfSection5 = R.concat(
      (props.changesOfSection5 || {})["02"] || [],
      (props.changesOfSection5 || {})["03"] || []
    );
    const { kohteet } = props.lupa;
    const { headingNumber, opiskelijavuodet } = kohteet[4];
    const { muutCombined } = kohteet[5];

    setHeadingNumber(headingNumber);

    setInitialValue(
      parseInt(
        (
          R.find(obj => {
            return obj.tyyppi === "Ammatillinen koulutus";
          }, opiskelijavuodet || []) || {}
        ).arvo || "0",
        10
      )
    );

    setApplyFor(getApplyFor("vahimmaisopiskelijavuodet", [])); // [] = opiskelijavuosimuutoksetValue
    setApplyForVaativa(getApplyFor("vaativa", [])); // [] = opiskelijavuosimuutoksetValue
    setApplyForSisaoppilaitos(getApplyFor("sisaoppilaitos", [])); // [] = opiskelijavuosimuutoksetValue

    setIsVaativaTukiVisible(
      !!isInLupa("2", muutCombined) ||
        (
          (
            R.find(
              R.propEq("anchor", "02.vaativat.16"),
              relevantChangesOfSection5
            ) || {}
          ).properties || {}
        ).isChecked
    );

    setIsSisaoppilaitosVisible(
      !!isInLupa("4", muutCombined) ||
        (
          (
            R.find(
              R.propEq("anchor", "03.sisaoppilaitos.4"),
              relevantChangesOfSection5
            ) || {}
          ).properties || {}
        ).isChecked
    );
  }, [props.lupa, props.changesOfSection5]);

  return (
    <Section code={headingNumber} title={heading}>
      <Opiskelijavuodet
        initialValue={initialValue}
        value={applyFor}
        mainTitle={
          props.intl.formatMessage(wizardMessages.minimumAmountOfYears)
        }
        titles={[
          props.intl.formatMessage(commonMessages.current),
          props.intl.formatMessage(commonMessages.applyFor),
          props.intl.formatMessage(commonMessages.difference)
        ]}
      />

      {isVaativaTukiVisible ? (
        <div className="pt-8">
          <Opiskelijavuodet
            isRequired={true}
            initialValue={initialValueVaativa}
            value={applyForVaativa}
            mainTitle={
              props.intl.formatMessage(wizardMessages.limitForSpecialSupport)
            }
            titles={[
              props.intl.formatMessage(commonMessages.current),
              props.intl.formatMessage(commonMessages.applyFor),
              props.intl.formatMessage(commonMessages.difference)
            ]}
          />
        </div>
      ) : null}

      {isSisaoppilaitosVisible ? (
        <div className="pt-8">
          <Opiskelijavuodet
            isRequired={true}
            initialValue={initialValueSisaoppilaitos}
            value={applyForSisaoppilaitos}
            mainTitle={
              props.intl.formatMessage(wizardMessages.limitForBoardingSchool)
            }
            titles={[
              props.intl.formatMessage(commonMessages.current),
              props.intl.formatMessage(commonMessages.applyFor),
              props.intl.formatMessage(commonMessages.difference)
            ]}
          />
        </div>
      ) : null}
    </Section>
  );
});

MuutospyyntoWizardOpiskelijavuodet.propTypes = {
  changesOfSection5: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);
