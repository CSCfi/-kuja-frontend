import React, { useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
import Opiskelijavuodet from "../components/Opiskelijavuodet";
import { injectIntl } from "react-intl";
import commonMessages from "../../../../../../i18n/definitions/common";
import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
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

const isInChanges = (areaCode, changes = []) => {
  return R.find(obj => {
    return obj.koodiarvo === areaCode && obj.type === MUUTOS_TYPES.ADDITION;
  }, changes || []);
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
      !!isInLupa("2", muutCombined) || isInChanges("4", [])
    );

    setIsSisaoppilaitosVisible(
      !!isInLupa("4", muutCombined) || isInChanges("4", [])
    );
  }, [props.lupa]);

  return (
    <Section code={headingNumber} title={heading}>
      <Opiskelijavuodet
        initialValue={initialValue}
        value={applyFor}
        mainTitle={
          MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAHIMMAISMAARA.FI
        }
        titles={[
          props.intl.formatMessage(commonMessages.current),
          props.intl.formatMessage(commonMessages.applyFor),
          props.intl.formatMessage(commonMessages.difference)
        ]}
      />

      {isVaativaTukiVisible ? (
        <React.Fragment>
          <Opiskelijavuodet
            isRequired={true}
            initialValue={initialValueVaativa}
            value={applyForVaativa}
            mainTitle={
              MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.VAATIVA_TUKI.FI
            }
            titles={[
              props.intl.formatMessage(commonMessages.current),
              props.intl.formatMessage(commonMessages.applyFor),
              props.intl.formatMessage(commonMessages.difference)
            ]}
          />
        </React.Fragment>
      ) : null}

      {isSisaoppilaitosVisible ? (
        <React.Fragment>
          <Opiskelijavuodet
            isRequired={true}
            initialValue={initialValueSisaoppilaitos}
            value={applyForSisaoppilaitos}
            mainTitle={
              MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPISKELIJAVUODET.SISAOPPILAITOS.FI
            }
            titles={[
              props.intl.formatMessage(commonMessages.current),
              props.intl.formatMessage(commonMessages.applyFor),
              props.intl.formatMessage(commonMessages.difference)
            ]}
          />
        </React.Fragment>
      ) : null}
    </Section>
  );
});

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);
