import React, { useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../components/02-organisms/ExpandableRowRoot";
import { getAnchorPart } from "../../../../../../utils/common";
import { isAdded, isInLupa, isRemoved } from "../../../../../../css/label";
import * as R from "ramda";

const MuutospyyntoWizardToimintaalue = React.memo(props => {
  const { onChangesUpdate, onStateUpdate } = props;

  const lisattavatKunnat = useMemo(() => {
    return R.sortBy(
      R.prop("title"),
      R.map(changeObj => {
        if (
          R.equals(getAnchorPart(changeObj.anchor, 1), "valintakentat") &&
          R.equals(getAnchorPart(changeObj.anchor, 2), "kunnat")
        ) {
          return changeObj.properties;
        }
        return null;
      }, props.changeObjects).filter(Boolean)
    );
  }, [props.changeObjects]);

  const poistettavatKunnat = useMemo(() => {
    return R.sortBy(
      R.prop("title"),
      R.map(changeObj => {
        if (
          R.equals(getAnchorPart(changeObj.anchor, 1), "lupaan-kuuluvat") &&
          R.equals(getAnchorPart(changeObj.anchor, 2), "kunnat")
        ) {
          return changeObj.properties;
        }
        return null;
      }, props.changeObjects).filter(Boolean)
    );
  }, [props.changeObjects]);

  const lisattavatMaakunnat = useMemo(() => {
    return R.sortBy(
      R.prop("title"),
      R.map(changeObj => {
        if (
          R.equals(getAnchorPart(changeObj.anchor, 1), "valintakentat") &&
          R.equals(getAnchorPart(changeObj.anchor, 2), "maakunnat")
        ) {
          return changeObj.properties;
        }
        return null;
      }, props.changeObjects).filter(Boolean)
    );
  }, [props.changeObjects]);

  const poistettavatMaakunnat = useMemo(() => {
    return R.sortBy(
      R.prop("title"),
      R.map(changeObj => {
        if (
          R.equals(getAnchorPart(changeObj.anchor, 1), "lupaan-kuuluvat") &&
          R.equals(getAnchorPart(changeObj.anchor, 2), "maakunnat")
        ) {
          return changeObj.properties;
        }
        return null;
      }, props.changeObjects).filter(Boolean)
    );
  }, [props.changeObjects]);

  const kunnatInLupa = useMemo(() => {
    return R.sortBy(
      R.path(["meta", "arvo"]),
      R.map(kunta => {
        return {
          availableActions: ["remove"],
          title: kunta.arvo,
          meta: kunta
        };
      }, props.lupakohde.kunnat)
    );
  }, [props.lupakohde.kunnat]);

  const maakunnatInLupa = useMemo(() => {
    return R.sortBy(
      R.path(["meta", "arvo"]),
      R.map(maakunta => {
        return {
          availableActions: ["remove"],
          title: maakunta.arvo,
          meta: maakunta
        };
      }, props.lupakohde.maakunnat)
    );
  }, [props.lupakohde.maakunnat]);

  const lupaanKuuluvatKunnatItems = useMemo(() => {
    return R.map(kuntaInLupa => {
      const asetettuPoistettavaksi = !!!R.find(
        R.pathEq(["meta", "koodiarvo"], kuntaInLupa.meta.koodiarvo),
        poistettavatKunnat
      );
      if (!asetettuPoistettavaksi) {
        return {
          ...kuntaInLupa,
          availableActions: R.without(
            "remove",
            kuntaInLupa.availableActions || []
          )
        };
      }
      return kuntaInLupa;
    }, kunnatInLupa);
  }, [kunnatInLupa, poistettavatKunnat]);

  const lupaanKuuluvatMaakunnatItems = useMemo(() => {
    return R.map(maakuntaInLupa => {
      const asetettuPoistettavaksi = !!!R.find(
        R.pathEq(["meta", "koodiarvo"], maakuntaInLupa.meta.koodiarvo),
        poistettavatMaakunnat
      );
      if (!asetettuPoistettavaksi) {
        return {
          ...maakuntaInLupa,
          availableActions: R.without(
            "remove",
            maakuntaInLupa.availableActions || []
          )
        };
      }
      return maakuntaInLupa;
    }, maakunnatInLupa);
  }, [maakunnatInLupa, poistettavatMaakunnat]);

  const valittavissaOlevatKunnat = useMemo(() => {
    return R.sortBy(
      R.prop("label"),
      R.map(kunta => {
        const labelObject = R.find(
          R.propEq("kieli", R.toUpper(props.intl.locale))
        )(kunta.metadata);
        const isKuntaInLupa = !!R.find(
          R.pathEq(["meta", "koodiarvo"], kunta.koodiArvo),
          kunnatInLupa
        );
        const isKuntaInLisattavat = !!R.find(
          R.pathEq(["meta", "koodiarvo"], kunta.koodiArvo),
          lisattavatKunnat
        );
        return isKuntaInLupa || isKuntaInLisattavat
          ? null
          : {
              label: labelObject.nimi,
              value: kunta.koodiArvo,
              meta: {
                koodisto: kunta.koodisto
              }
            };
      }, props.kunnat).filter(Boolean)
    );
  }, [kunnatInLupa, lisattavatKunnat, props.intl.locale, props.kunnat]);

  const valittavissaOlevatMaakunnat = useMemo(() => {
    return R.sortBy(
      R.prop("label"),
      R.map(maakunta => {
        const labelObject = R.find(
          R.propEq("kieli", R.toUpper(props.intl.locale))
        )(maakunta.metadata);
        const isMaakuntaInLupa = !!R.find(
          R.pathEq(["meta", "koodiarvo"], maakunta.koodiArvo),
          maakunnatInLupa
        );
        const isMaakuntaInLisattavat = !!R.find(
          R.pathEq(["meta", "koodiarvo"], maakunta.koodiArvo),
          lisattavatMaakunnat
        );
        return isMaakuntaInLupa || isMaakuntaInLisattavat
          ? null
          : {
              label: labelObject.nimi,
              value: maakunta.koodiArvo,
              meta: {
                koodisto: maakunta.koodisto
              }
            };
      }, props.maakunnat).filter(Boolean)
    );
  }, [
    lisattavatMaakunnat,
    maakunnatInLupa,
    props.intl.locale,
    props.maakunnat
  ]);

  const isValtakunnallinenChecked = useMemo(() => {
    const c = R.find(changeObj => {
      return R.equals(getAnchorPart(changeObj.anchor, 1), "valtakunnallinen");
    }, props.changeObjects);
    return (
      (!!props.lupakohde.valtakunnallinen && !c) ||
      !!(c && c.properties.isChecked)
    );
  }, [props.changeObjects, props.lupakohde.valtakunnallinen]);

  const handleChanges = useCallback(
    changesByAnchor => {
      const changeObjOfRemoval = R.find(
        R.pathEq(["properties", "remove"], true),
        changesByAnchor.changes
      );
      if (changeObjOfRemoval) {
        const koodiarvo = changeObjOfRemoval.properties.item.meta.koodiarvo;
        changesByAnchor.changes = R.filter(changeObj => {
          const keepByKoodiarvo = !R.pathEq(
            ["properties", "meta", "koodiarvo"],
            koodiarvo,
            changeObj
          );
          const keepBytype = !R.pathEq(
            ["properties", "remove"],
            true,
            changeObj
          );
          return keepByKoodiarvo && keepBytype;
        }, changesByAnchor.changes);
        if (R.includes("lupaan-kuuluvat", changeObjOfRemoval.anchor)) {
          changesByAnchor.changes = R.insert(
            -1,
            {
              anchor: `${changeObjOfRemoval.anchor}.${changeObjOfRemoval.properties.item.meta.koodiarvo}`,
              properties: {
                availableActions: ["remove"],
                meta: {
                  koodiarvo: changeObjOfRemoval.properties.item.meta.koodiarvo,
                  koodisto: {
                    koodistoUri:
                      changeObjOfRemoval.properties.item.meta.koodisto
                  }
                },
                title: changeObjOfRemoval.properties.item.meta.arvo
              }
            },
            changesByAnchor.changes
          );
        }
      }
      const c = {
        anchor: changesByAnchor.anchor,
        changes: R.map(changeObj => {
          if (
            R.includes("valintakentat", changeObj.anchor) &&
            !changeObj.properties.title
          ) {
            return {
              anchor: `${changeObj.anchor}.${changeObj.properties.value.value}`,
              properties: {
                availableActions: ["remove"],
                meta: {
                  koodiarvo: changeObj.properties.value.value,
                  koodisto: changeObj.properties.value.meta.koodisto
                },
                title: changeObj.properties.value.label
              }
            };
          }
          return changeObj;
        }, changesByAnchor.changes)
      };
      onChangesUpdate(c);
    },
    [onChangesUpdate]
  );

  const getCategories = useMemo(() => {
    return () => [
      {
        anchor: "info",
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            properties: {
              title:
                "Voit valita toimialueen koskevan koko maata (valtakunnallinen) tai yksittäisiä maakuntia ja kuntia."
            }
          }
        ]
      },
      {
        anchor: "valintakentat",
        isVisible: !isValtakunnallinenChecked,
        title: "Yksittäiset kunnat ja maakunnat",
        styleClasses: ["pt-0"],
        components: [
          {
            anchor: "maakunnat",
            name: "Autocomplete",
            styleClasses: "sm:px-4 sm:py-2",
            properties: {
              isMulti: false,
              options: valittavissaOlevatMaakunnat,
              placeholder: "Valitse maakunta...",
              value: []
            }
          },
          {
            anchor: "kunnat",
            name: "Autocomplete",
            styleClasses: "sm:px-4 sm:py-2",
            properties: {
              isMulti: false,
              options: valittavissaOlevatKunnat,
              placeholder: "Valitse kunta...",
              value: []
            }
          }
        ]
      },
      {
        anchor: "lupaan-lisattavat",
        isVisible:
          !isValtakunnallinenChecked &&
          !!(
            (!!lisattavatMaakunnat && lisattavatMaakunnat.length) ||
            (!!lisattavatKunnat && lisattavatKunnat.length)
          ),
        styleClasses: ["mt-0"],
        components: [
          {
            anchor: "maakunnat",
            name: "ActionList",
            styleClasses: "sm:px-4",
            properties: {
              info: lisattavatMaakunnat.length
                ? ""
                : "Voit lisätä maakuntia yllä olevan pudotusvalikon kautta.",
              items: lisattavatMaakunnat,
              title: "Lupaan lisättävät maakunnat:"
            }
          },
          {
            anchor: "kunnat",
            name: "ActionList",
            styleClasses: "sm:px-4",
            properties: {
              info: lisattavatKunnat.length
                ? ""
                : "Voit lisätä kuntia yllä olevan pudotusvalikon kautta.",
              items: lisattavatKunnat,
              title: "Lupaan lisättävät kunnat:"
            }
          }
        ]
      },
      {
        anchor: "luvasta-poistettavat",
        isVisible:
          !isValtakunnallinenChecked &&
          !!(
            (!!poistettavatMaakunnat && poistettavatMaakunnat.length) ||
            (!!poistettavatKunnat && poistettavatKunnat.length)
          ),
        styleClasses: ["mt-2"],
        components: [
          {
            anchor: "maakunnat",
            name: "ActionList",
            styleClasses: "sm:px-4",
            properties: {
              info: poistettavatMaakunnat.length
                ? "Voit perua muutoksen poistamalla maakunnan tältä listalta."
                : "Ei poistettavia maakuntia.",
              items: poistettavatMaakunnat,
              title: "Luvasta poistettavat maakunnat:"
            }
          },
          {
            anchor: "kunnat",
            name: "ActionList",
            styleClasses: "sm:px-4",
            properties: {
              info: poistettavatKunnat.length
                ? "Voit perua muutoksen poistamalla kunnan tältä listalta."
                : "Ei poistettavia kuntia.",
              title: "Luvasta poistettavat kunnat:",
              items: poistettavatKunnat
            }
          }
        ]
      },
      {
        anchor: "lupaan-kuuluvat",
        isVisible:
          !isValtakunnallinenChecked &&
          !!(
            (!!lupaanKuuluvatMaakunnatItems &&
              lupaanKuuluvatMaakunnatItems.length) ||
            (!!lupaanKuuluvatKunnatItems && lupaanKuuluvatKunnatItems.length)
          ),
        styleClasses: ["sm:items-baseline", "mt-2"],
        components: [
          {
            anchor: "maakunnat",
            name: "ActionList",
            styleClasses: "sm:px-4",
            properties: {
              info: lupaanKuuluvatMaakunnatItems.length
                ? "(Suluissa koodiarvo)"
                : "Ei lupaan kuuluvia maakuntia.",
              items: lupaanKuuluvatMaakunnatItems,
              title: "Lupaan kuuluvat maakunnat:"
            }
          },
          {
            anchor: "kunnat",
            name: "ActionList",
            styleClasses: "sm:px-4",
            properties: {
              info: lupaanKuuluvatKunnatItems.length
                ? "(Suluissa koodiarvo)"
                : "Ei lupaan kuuluvia kuntia.",
              items: lupaanKuuluvatKunnatItems,
              title: "Lupaan kuuluvat kunnat:"
            }
          }
        ]
      },
      {
        anchor: "valtakunnallinen",
        title: "Koko Suomi - pois lukien Ahvenanmaan maakunta",
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            styleClasses: "sm:px-4",
            properties: {
              isChecked: isValtakunnallinenChecked,
              labelStyles: {
                addition: isAdded,
                custom: props.lupakohde.valtakunnallinen ? isInLupa : {},
                removal: isRemoved
              },
              title: props.intl.formatMessage(wizardMessages.responsibilities)
            }
          }
        ]
      }
    ];
  }, [
    isValtakunnallinenChecked,
    lupaanKuuluvatKunnatItems,
    lupaanKuuluvatMaakunnatItems,
    lisattavatKunnat,
    lisattavatMaakunnat,
    poistettavatKunnat,
    poistettavatMaakunnat,
    props.intl,
    props.lupakohde.valtakunnallinen,
    valittavissaOlevatKunnat,
    valittavissaOlevatMaakunnat
  ]);

  useEffect(() => {
    onStateUpdate({
      categories: getCategories(),
      kohde: props.kohde,
      maaraystyyppi: props.maaraystyyppi
    });
  }, [getCategories, props.kohde, props.maaraystyyppi, onStateUpdate]);

  return (
    <React.Fragment>
      {R.path(["categories"], props.stateObjects.toimintaalue) ? (
        <ExpandableRowRoot
          anchor={props.sectionId}
          key={`expandable-row-root`}
          categories={props.stateObjects.toimintaalue.categories}
          changes={props.changeObjects}
          isExpanded={true}
          showCategoryTitles={true}
          onChangesRemove={props.onChangesRemove}
          onUpdate={handleChanges}
        />
      ) : null}
    </React.Fragment>
  );
});

MuutospyyntoWizardToimintaalue.defaultProps = {
  changeObjects: [],
  muutokset: [],
  kohde: {},
  kunnat: [],
  lupakohde: {},
  maakunnat: [],
  maakuntakunnat: {},
  maaraystyyppi: {},
  stateObjects: {
    toimintaalue: {}
  }
};

MuutospyyntoWizardToimintaalue.propTypes = {
  changeObjects: PropTypes.array,
  muutokset: PropTypes.array,
  kohde: PropTypes.object,
  kunnat: PropTypes.array,
  lupakohde: PropTypes.object,
  maakunnat: PropTypes.array,
  maakuntakunnat: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onStateUpdate: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onChangesRemove: PropTypes.func,
  stateObjects: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardToimintaalue);
