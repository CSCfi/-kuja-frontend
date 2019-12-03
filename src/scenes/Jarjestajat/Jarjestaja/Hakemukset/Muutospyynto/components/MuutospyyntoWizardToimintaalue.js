import React, { useEffect, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import ExpandableRowRoot from "../../../../../../components/02-organisms/ExpandableRowRoot";
import {
  getAnchorPart,
  replaceAnchorPartWith,
  removeAnchorPart
} from "../../../../../../utils/common";
import { isAdded, isInLupa, isRemoved } from "../../../../../../css/label";
import * as R from "ramda";

const MuutospyyntoWizardToimintaalue = React.memo(props => {
  const { onChangesUpdate, onStateUpdate } = props;

  /**
   * Saves a value for later use.
   * @param {*} value - Value to save for later use.
   */
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevChangeObjects = usePrevious(props.changeObjects.muutokset);

  const lisattavatKunnat = useMemo(() => {
    return R.sortBy(
      R.prop("title"),
      R.map(changeObj => {
        return R.equals(
          getAnchorPart(changeObj.anchor, 1),
          "lupaan-lisattavat-kunnat"
        )
          ? changeObj.properties
          : null;
      }, props.changeObjects.muutokset || []).filter(Boolean)
    );
  }, [props.changeObjects.muutokset]);

  const lisattavatMaakunnat = useMemo(() => {
    return R.sortBy(
      R.prop("title"),
      R.map(changeObj => {
        return R.equals(
          getAnchorPart(changeObj.anchor, 1),
          "lupaan-lisattavat-maakunnat"
        )
          ? changeObj.properties
          : null;
      }, props.changeObjects.muutokset || []).filter(Boolean)
    );
  }, [props.changeObjects.muutokset]);

  const kunnatInLupa = useMemo(() => {
    return R.sortBy(
      R.path(["metadata", "arvo"]),
      R.map(kunta => {
        return {
          title: kunta.arvo,
          metadata: kunta
        };
      }, props.lupakohde.kunnat)
    );
  }, [props.lupakohde.kunnat]);

  const maakunnatInLupa = useMemo(() => {
    return R.sortBy(
      R.path(["metadata", "arvo"]),
      R.map(maakunta => {
        return {
          title: maakunta.arvo,
          metadata: maakunta
        };
      }, props.lupakohde.maakunnat)
    );
  }, [props.lupakohde.maakunnat]);

  const valittavissaOlevatKunnat = useMemo(() => {
    return R.sortBy(
      R.prop("label"),
      R.map(kunta => {
        const labelObject = R.find(
          R.propEq("kieli", R.toUpper(props.intl.locale))
        )(kunta.metadata);
        const isKuntaInLupa = !!R.find(
          R.pathEq(["metadata", "koodiarvo"], kunta.koodiArvo),
          kunnatInLupa
        );
        const isKuntaInLisattavat = !!R.find(
          R.pathEq(["metadata", "koodiarvo"], kunta.koodiArvo),
          lisattavatKunnat
        );
        return isKuntaInLupa || isKuntaInLisattavat
          ? null
          : {
              label: labelObject.nimi,
              value: kunta.koodiArvo,
              metadata: {
                koodiarvo: kunta.koodiArvo,
                koodisto: kunta.koodisto,
                label: labelObject.nimi
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
          R.pathEq(["metadata", "koodiarvo"], maakunta.koodiArvo),
          maakunnatInLupa
        );
        const isMaakuntaInLisattavat = !!R.find(
          R.pathEq(["metadata", "koodiarvo"], maakunta.koodiArvo),
          lisattavatMaakunnat
        );
        return isMaakuntaInLupa || isMaakuntaInLisattavat
          ? null
          : {
              label: labelObject.nimi,
              value: maakunta.koodiArvo,
              metadata: {
                koodiarvo: maakunta.koodiArvo,
                koodisto: maakunta.koodisto,
                label: labelObject.nimi
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
    const valtakunnallinenChangeObject = R.find(changeObj => {
      return R.equals(getAnchorPart(changeObj.anchor, 1), "valtakunnallinen");
    }, props.changeObjects.muutokset || []);
    return (
      (!!props.lupakohde.valtakunnallinen && !valtakunnallinenChangeObject) ||
      !!(
        valtakunnallinenChangeObject &&
        valtakunnallinenChangeObject.properties.isChecked
      )
    );
  }, [props.changeObjects.muutokset, props.lupakohde.valtakunnallinen]);

  /**
   * There are two parts in Toiminta-alue section: 1) maakunnat and kunnat
   * 2) Koko Suomi - pois lukien Ahvenanmaan maakunta. When user makes changes
   * to either one we have to ensure that the changes related to the not selected
   * one are deleted. This function executes the deletion.
   */
  useEffect(() => {
    // isValtakunnallinenChecked = true = Koko Suomi...
    if (isValtakunnallinenChecked) {
      // Let's get rid of the other change objects and keep only the one related
      // to the Koko Suomi... selection.
      const valtakunnallinenChangeObject = R.filter(changeObj => {
        return R.equals(getAnchorPart(changeObj.anchor, 1), "valtakunnallinen");
      }, props.changeObjects.muutokset);
      // Let's check if updating is necessary.
      if (
        !R.equals(valtakunnallinenChangeObject, props.changeObjects.muutokset)
      ) {
        // Fist we are going to update the change objects of Toiminta-alue section
        // on form page one.
        onChangesUpdate({
          anchor: props.sectionId,
          changes: valtakunnallinenChangeObject // This is the only change object we want to keep
        });
        // Then it's time to get rid of the change objects of form page two (reasoning).
        // The change objects are divided into two parts. So we need to make two separate calls
        // to delete them.
        // Call 1...
        onChangesUpdate({
          anchor: `perustelut_${props.sectionId}_additions`,
          changes: []
        });
        // Call 2...
        onChangesUpdate({
          anchor: `perustelut_${props.sectionId}_removals`,
          changes: []
        });
      }
    } else if (prevChangeObjects) {
      // We go here when the Koko Suomi... checkbox is unchecked and if unchecking it
      // is the most recent action related to the Toiminta-alue section on the first page.
      const valtakunnallinenChangeObjectNow = R.find(changeObj => {
        return R.equals(getAnchorPart(changeObj.anchor, 1), "valtakunnallinen");
      }, props.changeObjects.muutokset || []);
      const valtakunnallinenChangeObjectBefore = R.find(changeObj => {
        return R.equals(getAnchorPart(changeObj.anchor, 1), "valtakunnallinen");
      }, prevChangeObjects || []);

      const isUncheckingTheMostRecentChange =
        // The case when Koko Suomi... is selected by default
        (!!valtakunnallinenChangeObjectNow &&
          (!!!valtakunnallinenChangeObjectBefore ||
            (!!valtakunnallinenChangeObjectBefore &&
              valtakunnallinenChangeObjectBefore.properties.isChecked ===
                true))) ||
        // The case when Koko Suomi... is not selected by default
        (!!!valtakunnallinenChangeObjectNow &&
          !!valtakunnallinenChangeObjectBefore &&
          valtakunnallinenChangeObjectBefore.properties.isChecked === true);

      if (isUncheckingTheMostRecentChange) {
        // Then it's time to get rid of the change objects of form page two (reasoning).
        onChangesUpdate({
          anchor: `perustelut_${props.sectionId}_additions`,
          changes: []
        });
        onChangesUpdate({
          anchor: `perustelut_${props.sectionId}_removals`,
          changes: []
        });
      }
    }
  }, [
    isValtakunnallinenChecked,
    onChangesUpdate,
    prevChangeObjects,
    props.changeObjects,
    props.sectionId
  ]);

  /**
   * Changes are handled here. Changes objects will be formed and callback
   * function will be called with them.
   */
  const handleChanges = useCallback(
    changesByAnchor => {
      const updatedChanges = R.map(changeObj => {
        let changeObjectsForKunnatInLupa = [];
        const metadata =
          R.path(["properties", "value", "metadata"], changeObj) ||
          R.path(["properties", "metadata"], changeObj);
        const koodistoUri = R.path(["koodisto", "koodistoUri"], metadata);
        const isMaakunta = koodistoUri && koodistoUri === "maakunta";
        if (isMaakunta) {
          const relatedKunnatParentObject = R.find(
            R.propEq("koodiArvo", metadata.koodiarvo),
            props.maakuntakunnatList
          );
          const kunnat = relatedKunnatParentObject
            ? relatedKunnatParentObject.kunta
            : [];
          changeObjectsForKunnatInLupa = R.map(kunta => {
            const kuntaInLupa = R.find(
              R.pathEq(["metadata", "koodiarvo"], kunta.koodiArvo),
              kunnatInLupa
            );
            const kuntaChangeObj = R.find(
              R.propEq(
                "anchor",
                `toimintaalue.lupaan-kuuluvat-kunnat.${kunta.koodiarvo}`
              ),
              props.changeObjects.muutokset || []
            );
            const isKuntaAlreadyUnchecked =
              kuntaChangeObj && kuntaChangeObj.properties.isChecked === false;

            return !!kuntaInLupa && !isKuntaAlreadyUnchecked
              ? {
                  anchor: `toimintaalue.lupaan-kuuluvat-kunnat.${kunta.koodiArvo}`,
                  properties: {
                    ...kuntaInLupa.properties,
                    isChecked: false,
                    metadata: {
                      title: kuntaInLupa.title,
                      koodiarvo: kunta.koodiArvo,
                      koodisto: { koodistoUri: kunta.koodisto }
                    }
                  }
                }
              : null;
          }, kunnat).filter(Boolean);
        }

        if (
          // Let's remove all the change objects which are not checked and which are not in LUPA
          R.includes("lupaan-lisattavat", changeObj.anchor) &&
          changeObj.properties.isChecked === false
        ) {
          return null;
        } else if (R.includes("valintakentat", changeObj.anchor)) {
          // Let's return a new change object based on the one user selected using select element
          const updatedAnchor = `${removeAnchorPart(
            replaceAnchorPartWith(
              changeObj.anchor,
              1,
              "lupaan-lisattavat-" + getAnchorPart(changeObj.anchor, 2)
            ),
            -1
          )}.${changeObj.properties.value.value}`;
          return [
            {
              anchor: updatedAnchor,
              properties: {
                isChecked: true,
                metadata: changeObj.properties.value.metadata,
                title: changeObj.properties.value.label
              }
            },
            changeObjectsForKunnatInLupa
          ];
        }
        return [changeObj, changeObjectsForKunnatInLupa];
      }, changesByAnchor.changes).filter(Boolean);

      const sectionChanges = {
        anchor: changesByAnchor.anchor,
        changes: R.flatten(updatedChanges)
      };
      onChangesUpdate(sectionChanges);
    },
    [
      onChangesUpdate,
      kunnatInLupa,
      props.changeObjects.muutokset,
      props.maakuntakunnatList
    ]
  );

  const getCategories = useMemo(() => {
    return () => [
      /**
       * VALINTAKENTTÄ - MAAKUNNAT
       */
      {
        anchor: "valintakentat-maakunta",
        isVisible: !isValtakunnallinenChecked,
        title: "Maakunnat",
        styleClasses: ["pt-0"],
        components: [
          {
            anchor: "maakunnat",
            name: "Autocomplete",
            styleClasses: ["ml-10 mt-4"],
            properties: {
              isMulti: false,
              options: valittavissaOlevatMaakunnat,
              placeholder: "Valitse maakunta...",
              value: []
            }
          }
        ]
      },
      /**
       * LUPAAN KUULUVAT MAAKUNNAT
       */
      {
        anchor: "lupaan-kuuluvat-maakunnat",
        isVisible:
          !isValtakunnallinenChecked &&
          !!maakunnatInLupa &&
          maakunnatInLupa.length > 0,
        layout: {
          indentation: "large",
          components: {
            justification: "start"
          }
        },
        components: R.map(maakunta => {
          return {
            anchor: maakunta.metadata.koodiarvo,
            name: "CheckboxWithLabel",
            styleClasses: ["w-1/2 sm:w-1/4"],
            properties: {
              isChecked: true,
              labelStyles: {
                removal: isRemoved
              },
              forChangeObject: {
                koodiarvo: maakunta.metadata.koodiarvo,
                koodisto: { koodistoUri: maakunta.metadata.koodisto },
                title: maakunta.title
              },
              title: maakunta.title
            }
          };
        }, maakunnatInLupa),
        title:
          maakunnatInLupa && maakunnatInLupa.length ? "Lupaan kuuluvat" : ""
      },
      /**
       * LUPAAN LISÄTTÄVÄT MAAKUNNAT
       */
      {
        anchor: "lupaan-lisattavat-maakunnat",
        isVisible:
          !isValtakunnallinenChecked &&
          !!lisattavatMaakunnat &&
          lisattavatMaakunnat.length > 0,
        layout: {
          indentation: "large",
          components: {
            justification: "start"
          }
        },
        components: R.map(maakunta => {
          return {
            anchor: maakunta.metadata.koodiarvo,
            name: "CheckboxWithLabel",
            styleClasses: ["w-1/2 sm:w-1/4"],
            properties: {
              isChecked: true,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved
              },
              title: maakunta.title
            }
          };
        }, lisattavatMaakunnat),
        title: "Lupaan lisättävät"
      },
      /**
       * VALINTAKENTTÄ - KUNNAT
       */
      {
        anchor: "valintakentat-kunta",
        isVisible: !isValtakunnallinenChecked,
        title: "Kunnat",
        components: [
          {
            anchor: "kunnat",
            name: "Autocomplete",
            styleClasses: ["ml-10 mt-4"],
            properties: {
              isMulti: false,
              options: valittavissaOlevatKunnat,
              placeholder: "Valitse kunta...",
              value: []
            }
          }
        ]
      },
      /**
       * LUPAAN KUULUVAT KUNNAT
       */
      {
        anchor: "lupaan-kuuluvat-kunnat",
        isVisible:
          !isValtakunnallinenChecked && !!kunnatInLupa && kunnatInLupa.length,
        layout: {
          indentation: "large",
          components: {
            justification: "start"
          }
        },
        components: R.map(kunta => {
          return {
            anchor: kunta.metadata.koodiarvo,
            name: "CheckboxWithLabel",
            styleClasses: ["w-1/2 sm:w-1/4"],
            properties: {
              isChecked: true,
              labelStyles: {
                removal: isRemoved
              },
              forChangeObject: {
                koodiarvo: kunta.metadata.koodiarvo,
                koodisto: { koodistoUri: kunta.metadata.koodisto },
                title: kunta.title
              },
              title: kunta.title
            }
          };
        }, kunnatInLupa),
        title: kunnatInLupa && kunnatInLupa.length ? "Lupaan kuuluvat" : ""
      },
      /**
       * LUPAAN LISÄTTÄVÄT KUNNAT
       */
      {
        anchor: "lupaan-lisattavat-kunnat",
        isVisible:
          !isValtakunnallinenChecked &&
          !!lisattavatKunnat &&
          lisattavatKunnat.length > 0,
        layout: {
          indentation: "large",
          components: {
            justification: "start"
          }
        },
        components: R.map(kunta => {
          return {
            anchor: kunta.metadata.koodiarvo,
            name: "CheckboxWithLabel",
            styleClasses: ["w-1/2 sm:w-1/4"],
            properties: {
              isChecked: true,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved
              },
              title: kunta.title
            }
          };
        }, lisattavatKunnat),
        title: "Lupaan lisättävät"
      },
      /**
       * VALTAKUNNALLINEN
       */
      {
        anchor: "valtakunnallinen",
        title: "Koko Suomi - pois lukien Ahvenanmaan maakunta",
        components: [
          {
            anchor: "A",
            name: "CheckboxWithLabel",
            styleClasses: ["ml-10"],
            properties: {
              isChecked: isValtakunnallinenChecked,
              labelStyles: {
                addition: isAdded,
                custom: props.lupakohde.valtakunnallinen ? isInLupa : {},
                removal: isRemoved
              },
              forChangeObject: {
                title: props.intl.formatMessage(wizardMessages.responsibilities)
              },
              title: props.intl.formatMessage(wizardMessages.responsibilities)
            }
          }
        ]
      }
    ];
  }, [
    isValtakunnallinenChecked,
    kunnatInLupa,
    maakunnatInLupa,
    lisattavatKunnat,
    lisattavatMaakunnat,
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
          changes={props.changeObjects.muutokset}
          isExpanded={true}
          showCategoryTitles={true}
          onChangesRemove={props.onChangesRemove}
          onUpdate={handleChanges}
          title={"Yksittäiset kunnat ja maakunnat tai koko maa"}
        />
      ) : null}
    </React.Fragment>
  );
});

MuutospyyntoWizardToimintaalue.defaultProps = {
  changeObjects: {},
  kohde: {},
  kunnat: [],
  lupakohde: {},
  maakunnat: [],
  maakuntakunnatList: [],
  maaraystyyppi: {},
  stateObjects: {
    toimintaalue: {}
  }
};

MuutospyyntoWizardToimintaalue.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  kunnat: PropTypes.array,
  lupakohde: PropTypes.object,
  maakunnat: PropTypes.array,
  maakuntakunnatList: PropTypes.array,
  maaraystyyppi: PropTypes.object,
  onStateUpdate: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onChangesRemove: PropTypes.func,
  stateObjects: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardToimintaalue);
