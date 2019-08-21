import React, { useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
import commonMessages from "../../../../../../i18n/definitions/common";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
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
  const sectionId = "opiskelijavuodet";
  const heading = props.intl.formatMessage(wizardMessages.header_section4);
  const { onUpdate } = props;

  const [headingNumber, setHeadingNumber] = useState(0);
  const [isVaativaTukiVisible, setIsVaativaTukiVisible] = useState(false);
  const [isSisaoppilaitosVisible, setIsSisaoppilaitosVisible] = useState(false);
  const [applyFor, setApplyFor] = useState(0);
  const [applyForVaativa, setApplyForVaativa] = useState(0);
  const [applyForSisaoppilaitos, setApplyForSisaoppilaitos] = useState(0);
  const [initialValue, setInitialValue] = useState(0);
  const [initialValueVaativa] = useState(0);
  const [initialValueSisaoppilaitos] = useState(0);

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

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

  useEffect(() => {
    const titles = [
      props.intl.formatMessage(commonMessages.current),
      props.intl.formatMessage(commonMessages.applyFor),
      props.intl.formatMessage(commonMessages.difference)
    ];
    const allCategories = [
      {
        anchor: "vahimmaisopiskelijavuodet",
        title: props.intl.formatMessage(wizardMessages.minimumAmountOfYears),
        components: [
          {
            name: "Difference",
            properties: {
              initialValue: initialValue,
              applyForValue: applyFor,
              name: `${sectionId}-difference-1`,
              titles
            }
          }
        ]
      },
      {
        anchor: "vaativatuki",
        title: props.intl.formatMessage(wizardMessages.limitForSpecialSupport),
        components: [
          {
            name: "Difference",
            properties: {
              initialValue: initialValueVaativa,
              applyForValue: applyForVaativa,
              name: `${sectionId}-difference-2`,
              titles
            }
          }
        ]
      },
      {
        anchor: "sisaoppilaitos",
        title: props.intl.formatMessage(wizardMessages.limitForBoardingSchool),
        components: [
          {
            name: "Difference",
            properties: {
              initialValue: initialValueSisaoppilaitos,
              applyForValue: applyForSisaoppilaitos,
              name: `${sectionId}-difference-3`,
              titles
            }
          }
        ]
      }
    ];

    const activeCategories = R.filter(category => {
      return (
        category.anchor === "vahimmaisopiskelijavuodet" ||
        (category.anchor === "vaativatuki" && isVaativaTukiVisible) ||
        (category.anchor === "sisaoppilaitos" && isSisaoppilaitosVisible)
      );
    }, allCategories);
    setCategories(activeCategories);
  }, [
    applyFor,
    applyForSisaoppilaitos,
    applyForVaativa,
    initialValue,
    initialValueSisaoppilaitos,
    initialValueVaativa,
    isSisaoppilaitosVisible,
    isVaativaTukiVisible,
    props.intl
  ]);

  useEffect(() => {
    onUpdate({
      sectionId,
      state: {
        categories,
        changes,
        kohde: props.kohde,
        maaraystyyppi: props.maaraystyyppi
      }
    });
  }, [categories, onUpdate, changes, props.kohde, props.maaraystyyppi]);

  const saveChanges = payload => {
    setChanges(payload.changes);
  };

  const removeChanges = () => {
    saveChanges({ changes: [] });
  };

  return (
    <Section code={headingNumber} title={heading}>
      <ExpandableRowRoot
        anchor={"opiskelijavuodet"}
        key={`expandable-row-root`}
        categories={categories}
        changes={changes}
        index={0}
        onChangesRemove={removeChanges}
        onUpdate={saveChanges}
        sectionId={sectionId}
        title={""}
        isExpanded={true}
      />
    </Section>
  );
});

MuutospyyntoWizardOpiskelijavuodet.propTypes = {
  changesOfSection5: PropTypes.object,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
};

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);
