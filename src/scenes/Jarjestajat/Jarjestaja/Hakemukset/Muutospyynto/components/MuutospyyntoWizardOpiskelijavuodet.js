import React, { useEffect, useState } from "react";
import commonMessages from "../../../../../../i18n/definitions/common";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const getApplyFor = (categoryName, items) => {
  return (
    R.find(value => {
      return value.kategoria === categoryName;
    }, items || []) || {}
  ).arvo;
};

const isInLupa = (areaCode, items) => {
  return !!R.find(obj => {
    return obj.koodiarvo === areaCode;
  }, items);
};

const MuutospyyntoWizardOpiskelijavuodet = React.memo(props => {
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;
  const { kohteet } = props.lupa;
  const { opiskelijavuodet } = kohteet[4];
  const { muutCombined } = kohteet[5];

  const [isVaativaTukiVisible, setIsVaativaTukiVisible] = useState(false);
  const [isSisaoppilaitosVisible, setIsSisaoppilaitosVisible] = useState(false);
  const [applyFor, setApplyFor] = useState(0);
  const [applyForVaativa, setApplyForVaativa] = useState(0);
  const [applyForSisaoppilaitos, setApplyForSisaoppilaitos] = useState(0);
  const [initialValue, setInitialValue] = useState(0);
  const [koodiarvot, setKoodiarvot] = useState({});
  const [initialValueVaativa] = useState(0);
  const [initialValueSisaoppilaitos] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const relevantChangesOfSection5 = R.concat(
      (props.changesOfSection5 || {})["02"] || [],
      (props.changesOfSection5 || {})["03"] || []
    );

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
  }, [muutCombined, props.lupa, props.changesOfSection5]);

  useEffect(() => {
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
  }, [opiskelijavuodet]);

  useEffect(() => {
    const tmpApplyFor = getApplyFor("vahimmaisopiskelijavuodet", []);
    setApplyFor(tmpApplyFor || initialValue); // [] = opiskelijavuosimuutoksetValue
  }, [initialValue]);

  useEffect(() => {
    const maarays = R.find(R.propEq("koodisto", "koulutussektori"))(
      props.lupa.data.maaraykset
    );
    if (maarays) {
      setKoodiarvot(prevState => {
        return {
          ...prevState,
          vahimmaisopiskelijavuodet: maarays.koodiarvo
        };
      });
    }
  }, [props.lupa.data.maaraykset]);

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
            anchor: "A",
            name: "Difference",
            properties: {
              initialValue: initialValue,
              applyForValue: applyFor,
              name: `${props.sectionId}-difference-1`,
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
            anchor: "A",
            name: "Difference",
            properties: {
              initialValue: initialValueVaativa,
              applyForValue: applyForVaativa,
              name: `${props.sectionId}-difference-2`,
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
            anchor: "A",
            name: "Difference",
            properties: {
              initialValue: initialValueSisaoppilaitos,
              applyForValue: applyForSisaoppilaitos,
              name: `${props.sectionId}-difference-3`,
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
    if (props.muut) {
      // Mikäli jokin alla olevista koodeista on valittuna osiossa 5, näytetään vaativaa tukea koskevat kentät osiossa 4.
      const vaativatCodes = [2, 16, 17, 18, 19, 20, 21];

      const flattenChangesOfMuut = R.flatten(
        R.values(props.changeObjects.muut)
      );

      const sisaoppilaitosState = R.find(
        R.propEq("key", "sisaoppilaitos"),
        props.stateObjects.muut.muutdata
      );

      const isSisaoppilaitosCheckedByDefault =
        sisaoppilaitosState.categories[0].categories[0].components[0].properties
          .isChecked;

      // 5. osion muutosten joukosta etsitään sisäoppilaitosta koskeva muutos.
      const sisaoppilaitosChange = R.find(item => {
        return R.contains("sisaoppilaitos", item.anchor);
      })(flattenChangesOfMuut);

      /**
       * Mikäli muutos löytyy ja sisäoppilaitosta koskeva kohta osiossa 5 on valittu, tulee sisäoppilaitosta
       * koskeva tietue näyttää osiossa 4.
       */
      const shouldSisaoppilaitosBeVisible =
        (isSisaoppilaitosCheckedByDefault && !sisaoppilaitosChange) ||
        sisaoppilaitosChange.properties.isChecked;

      /**
       * Seuraavaksi etsitään ne vaativaa tukea koskevat - osioon 5 tehdyt - muutokset, jotka vaikuttavat
       * vaativaa tukea käsittelevän tietueen näkyvyyteen osiossa 4.
       */
      const vaativatChanges = R.filter(item => {
        const anchorParts = R.split(".", item.anchor);
        return (
          R.contains("vaativatuki", item.anchor) &&
          R.contains(parseInt(R.slice(2, 3)(anchorParts), 10), vaativatCodes)
        );
      })(flattenChangesOfMuut);

      const vaativatukiState = R.find(
        R.propEq("key", "vaativatuki"),
        props.stateObjects.muut.muutdata
      );

      const isVaativatukiCheckedByDefault = R.find(category => {
        return category.components[0].properties.isChecked;
      }, vaativatukiState.categories[0].categories);

      const isCheckedByChange = !!R.filter(
        R.compose(
          R.equals(true),
          R.path(["properties", "isChecked"])
        )
      )(vaativatChanges).length;

      const shouldVaativatBeVisible =
        isVaativatukiCheckedByDefault || isCheckedByChange;

      setIsSisaoppilaitosVisible(shouldSisaoppilaitosBeVisible);
      setIsVaativaTukiVisible(shouldVaativatBeVisible);
    }
  }, [props.changeObjects.muut, props.stateObjects.muut]);

  useEffect(() => {
    if (!isSisaoppilaitosVisible && props.changeObjects.opiskelijavuodet) {
      const changesWithoutSisaoppilaitosChanges = R.filter(
        R.compose(
          R.not,
          R.contains("sisaoppilaitos"),
          R.prop("anchor")
        )
      )(props.changeObjects.opiskelijavuodet);
      if (
        !R.equals(
          changesWithoutSisaoppilaitosChanges,
          props.changeObjects.opiskelijavuodet
        )
      ) {
        onChangesUpdate({ anchor: props.sectionId, changes: changesWithoutSisaoppilaitosChanges });
      }
    }
  }, [props.changeObjects.opiskelijavuodet, isSisaoppilaitosVisible]);

  useEffect(() => {
    if (!isVaativaTukiVisible && props.changeObjects.opiskelijavuodet) {
      const changesWithoutVaativaTukiChanges = R.filter(
        R.compose(
          R.not,
          R.contains("vaativatuki"),
          R.prop("anchor")
        )
      )(props.changeObjects.opiskelijavuodet);
      if (
        !R.equals(
          changesWithoutVaativaTukiChanges,
          props.changeObjects.opiskelijavuodet
        )
      ) {
        onChangesUpdate({ anchor: props.sectionId, changes: changesWithoutVaativaTukiChanges });
      }
    }
  }, [props.changeObjects.opiskelijavuodet, isVaativaTukiVisible]);

  useEffect(() => {
    if (props.kohde && props.maaraystyyppi && props.muut) {
      onStateUpdate({
        categories,
        kohde: props.kohde,
        maaraystyyppi: props.maaraystyyppi,
        muut: props.muut,
        koodiarvot
      });
    }
  }, [categories, props.kohde, props.maaraystyyppi, props.muut, koodiarvot]);

  return (
    <ExpandableRowRoot
      anchor={props.sectionId}
      key={`expandable-row-root`}
      categories={categories}
      changes={R.path(["opiskelijavuodet"], props.changeObjects)}
      index={0}
      onChangesRemove={onChangesRemove}
      onUpdate={onChangesUpdate}
      sectionId={props.sectionId}
      showCategoryTitles={true}
      title={""}
      isExpanded={true}
    />
  );
});

MuutospyyntoWizardOpiskelijavuodet.defaultProps = {
  changeObjects: {},
  stateObjects: {}
};

MuutospyyntoWizardOpiskelijavuodet.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  muut: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObjects: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);
