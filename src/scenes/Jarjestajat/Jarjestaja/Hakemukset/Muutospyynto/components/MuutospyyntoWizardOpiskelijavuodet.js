import React, { useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
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
  const sectionId = "opiskelijavuodet";
  const heading = props.intl.formatMessage(wizardMessages.header_section4);
  const { onUpdate } = props;
  const { kohteet } = props.lupa;
  const { headingNumber, opiskelijavuodet } = kohteet[4];
  const { muutCombined } = kohteet[5];

  // const [headingNumber, setHeadingNumber] = useState(0);
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

    // setHeadingNumber(headingNumber);

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
    console.info(tmpApplyFor, initialValue);
    setApplyFor(tmpApplyFor || initialValue); // [] = opiskelijavuosimuutoksetValue
  }, [initialValue]);

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
    /**
     *  Osio 4 = Opiskelijavuodet, osio 5 = Muut
     *
     *  Mikäli osiosta 5 on valittu sisäoppilaitosta koskeva kohta, näytetään sitä vastaavat kentät osiossa 4.
     *  Vastaavasti, mikäli osiosta 5 on valittu jokin vaativaa tukea ilmentävistä radio button -valinnoista,
     *  näytetään osiossa 4 valintaa vastaavat kentät.
     *  Aloitetaan ottamalla  kopio nykyisistä osion 4 muutoksista.
     */
    let _changes = _.cloneDeep(changes);
    // Mikäli jokin alla olevista koodeista on valittuna osiossa 5, näytetään vaativaa tukea koskevat kentät osiossa 4.
    const vaativatCodes = [2, 16, 17, 18, 19, 20, 21];
    // muutChanges sisältää 5. osion muutokset, jotka tässä muokataan helpommin läpikäytävään muotoon.
    const changesFlatten = R.flatten(R.values(props.muutChanges));
    // 5. osion muutosten joukosta etsitään sisäoppilaitosta koskeva muutos.
    const sisaoppilaitosChange = R.find(item => {
      return R.contains("sisaoppilaitos", item.anchor);
    })(changesFlatten);
    /**
     * Mikäli muutos löytyy ja sisäoppilaitosta koskeva kohta osiossa 5 on valittu, tulee sisäoppilaitosta
     * koskeva tietue näyttää osiossa 4.
     */

    const shouldSisaoppilaitosBeVisible = !!(
      sisaoppilaitosChange && sisaoppilaitosChange.properties.isChecked
    );
    /**
     * Mikäli sisäoppilaitosta koskeva tietue tulee poistaa osiosta 4, tulee tässä vaiheessa käydä läpi käyttäjän
     * osioon 4 tekemät muutokset ja poistaa niiden joukosta sisäoppilaitosta koskevat.
     */
    if (!shouldSisaoppilaitosBeVisible) {
      _changes = R.filter(changeObj => {
        return R.not(R.contains("sisaoppilaitos", changeObj.anchor));
      })(_changes);
    }
    /**
     * Tässä vaiheessa _changes sisältää vain ne osion 4 muutokset, jotka eivät liity sisäoppilaitokseen.
     * Seuraavaksi etsitään ne vaativaa tukea koskevat - osioon 5 tehdyt - muutokset, jotka vaikuttavat
     * vaativaa tukea käsittelevän tietueen näkyvyyteen osiossa 4.
     */

    const vaativatChanges = R.filter(item => {
      const anchorParts = R.split(".", item.anchor);
      return (
        R.contains("vaativat", item.anchor) &&
        R.contains(parseInt(R.last(anchorParts), 10), vaativatCodes)
      );
    })(changesFlatten);
    /**
     * Mikäli edellä kirjoitetun kaltaisia muutoksia löytyy, niitä löytyy 5. osion radio button -valinnasta
     * johtuen korkeintaan yksi (1) kappale. Tuloksen perusteella voidaan 4. osion vaativaa tukea koskeva
     * tietue asettaa joko näytettäväksi tai poistaa käyttäjän ulottumattomiin.
     * */

    const shouldVaativatBeVisible = !!vaativatChanges.length;
    /**
     * Kuten sisäoppilaitoksen tapauksessa, myös vaativan tuen kohdalla tulee edellisestä tuloksesta riippuen
     * poistaa käyttäjän 4. osioon tekemien muutosten joukosta vaativaa tukea koskevat muutokset.
     */
    if (!shouldVaativatBeVisible) {
      _changes = R.filter(changeObj => {
        return R.not(R.contains("vaativatuki", changeObj.anchor));
      })(_changes);
    }
    /**
     * Nyt _changes sisältää vain ne 4. osion muutokset, joita vastaavat tietueet ovat näkyvissä ja käyttäjän
     * muokattavissa. Seuraavaksi tulee päivittää 4. osion tila vastaamaan uutta tilannetta.
     * Poistetaan sisäoppilaitosta koskeva tietue osiosta 4.
     */
    setIsSisaoppilaitosVisible(shouldSisaoppilaitosBeVisible);
    // Poistetaan vaativaa tukea koskeva tietue osiosta 4.
    setIsVaativaTukiVisible(shouldVaativatBeVisible);
    // Päivitetään muutosten lista, mutta vain, mikäli uusi tilanne eroaa aiemmasta.
    if (
      R.compose(
        R.not,
        R.equals(changes)
      )(_changes)
    ) {
      setChanges(_changes);
    }
    console.info(_changes, props.muutChanges, changesFlatten, vaativatChanges);
  }, [changes, props.muutChanges]);

  useEffect(() => {
    onUpdate({
      sectionId,
      payload: {
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
  muutChanges: PropTypes.object,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
};

export default injectIntl(MuutospyyntoWizardOpiskelijavuodet);
