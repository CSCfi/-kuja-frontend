import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import * as R from "ramda";

const PerustelutTutkintokielet = React.memo(props => {
  const sectionId = "perustelut_kielet_tutkintokielet";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;
  const [isChanges, setIsChanges] = useState(false);

  useEffect(() => {
    const getCategories = () => {
      const localeUpper = R.toUpper(props.intl.locale);
      const currentDate = new Date();
      return R.mapObjIndexed((changeObjs, areaCode) => {
        return R.map(changeObj => {
          const anchorParts = R.split(".", changeObj.anchor);
          const item = R.find(
            R.propEq("koodiArvo", anchorParts[2]),
            props.tutkinnot[areaCode].koulutukset[anchorParts[1]].koulutukset
          );
          const koulutusalaMetadata = R.find(
            R.propEq("kieli", R.toUpper(props.intl.locale)),
            props.tutkinnot[areaCode].metadata
          );
          const metadata = R.find(
            R.propEq("kieli", R.toUpper(props.intl.locale)),
            item.metadata
          );

          /**
           * There might be some sub articles (alimääräyksiä) under the current article (määräys).
           * We are interested of them which are related to tutkintokielet section.
           * */
          const maarays = R.find(
            R.propEq("koodiarvo", anchorParts[2]),
            props.maaraykset
          );
          const alimaaraykset = maarays ? maarays.aliMaaraykset : [];

          /**
           * selectedByDefault includes all the languages which already are in LUPA.
           * */
          const selectedByDefault = R.map(alimaarays => {
            if (
              alimaarays.kohde.tunniste === "opetusjatutkintokieli" &&
              new Date(alimaarays.koodi.voimassaAlkuPvm) < currentDate
            ) {
              const metadataObj = R.find(
                R.propEq("kieli", localeUpper),
                alimaarays.koodi.metadata
              );
              return metadataObj
                ? {
                    label: metadataObj.nimi,
                    value: alimaarays.koodi.koodiArvo
                  }
                : null;
            }
            return null;
          }, alimaaraykset || []).filter(Boolean);
          return {
            anchor: anchorParts[1],
            code: item.koodiArvo,
            title: metadata.nimi,
            categories: R.addIndex(R.map)((language, index) => {
              const isSelectedByDefault = !!R.find(
                R.propEq("value", language.value),
                selectedByDefault
              );
              const isAdded = !isSelectedByDefault;
              const isRemoved =
                isSelectedByDefault &&
                !!!R.find(
                  R.propEq("value", language.value),
                  changeObj.properties.value || []
                );
              return isAdded || isRemoved
                ? {
                    anchor: item.koodiArvo,
                    categories: [
                      {
                        anchor: "perustelut",
                        components: [
                          {
                            anchor: "A",
                            name: "StatusTextRow",
                            properties: {
                              title: `${language.label} (${language.value})`,
                              styleClasses: ["flex"],
                              statusTextStyleClasses: isAdded
                                ? ["text-green-600 pr-4 w-20 font-bold"]
                                : ["text-red-500 pr-4 w-20 font-bold"],
                              statusText: isAdded ? " LISÄYS:" : " POISTO:"
                            }
                          }
                        ]
                      },
                      {
                        anchor: "tekstikentta",
                        components: [
                          {
                            anchor: index,
                            name: "TextBox",
                            properties: {
                              isReadOnly: props.isReadOnly,
                              placeholder: "Perustele muutos, kiitos"
                            }
                          }
                        ]
                      }
                    ]
                  }
                : [];
            }, R.flatten([selectedByDefault, changeObj.properties.value].filter(Boolean))),
            metadata: {
              areaCode,
              title: koulutusalaMetadata.nimi
            }
          };
        }, changeObjs || []).filter(Boolean);
      }, props.changeObjects.tutkintokielet);
    };
    const categories = getCategories();
    onStateUpdate({ categories }, sectionId);
  }, [
    onStateUpdate,
    props.changeObjects.tutkintokielet,
    props.intl.locale,
    props.isReadOnly,
    props.koulutukset,
    props.maaraykset,
    props.tutkinnot,
    props.stateObjects.tutkintokielet
  ]);

  useEffect(() => {
    R.forEachObjIndexed(item => {
      if (!R.isEmpty(item)) {
        setIsChanges(true);
      }
    }, props.changeObjects.tutkintokielet || []);
  });

  if (isChanges) {
    return (
      <React.Fragment>
        {!!R.path(["perustelut", "categories"], props.stateObjects) ? (
          <div>
            <h2 className="py-4">Tutkintokielet</h2>
            {R.addIndex(R.map)((categories, index) => {
              const areaCode = R.path([0, "metadata", "areaCode"], categories);
              const changes = R.path(
                ["tutkintokielet", areaCode],
                props.changeObjects
              );
              if (changes && !R.isEmpty(changes)) {
                return areaCode ? (
                  <ExpandableRowRoot
                    anchor={`${sectionId}_${areaCode}`}
                    key={`expandable-row-root-${index}`}
                    categories={categories}
                    changes={R.path(
                      ["perustelut", areaCode],
                      props.changeObjects
                    )}
                    disableReverting={props.isReadOnly}
                    onChangesRemove={onChangesRemove}
                    onUpdate={onChangesUpdate}
                    sectionId={sectionId}
                    showCategoryTitles={true}
                    code={areaCode}
                    title={categories[0].metadata.title}
                    isExpanded={true}
                    hideAmountOfChanges={true}
                  />
                ) : null;
              }
            }, R.values(R.path(["perustelut", "categories"], props.stateObjects)))}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
  return <React.Fragment />;
});

PerustelutTutkintokielet.defaultValues = {
  changeObjects: {},
  isReadOnly: false,
  maaraykset: [],
  stateObjects: {}
};

PerustelutTutkintokielet.propTypes = {
  changeObjects: PropTypes.object,
  tutkinnot: PropTypes.object,
  maaraykset: PropTypes.array,
  stateObjects: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func
};

export default injectIntl(PerustelutTutkintokielet);
