import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import * as R from "ramda";

const PerustelutTutkintokielet = React.memo(props => {
  const sectionId = "perustelut_kielet_tutkintokielet";
  const { onChangesRemove, onChangesUpdate, onStateUpdate } = props;

  useEffect(() => {
    const getCategories = () => {
      return R.mapObjIndexed((changeObjs, areaCode) => {
        return R.map(changeObj => {
          const anchorParts = R.split(".", changeObj.anchor);
          const item = R.find(
            R.propEq("koodiArvo", anchorParts[2]),
            props.koulutukset.koulutusdata[areaCode].koulutukset[anchorParts[1]]
              .koulutukset
          );
          const koulutusalaMetadata = R.find(
            R.propEq("kieli", R.toUpper(props.intl.locale)),
            props.koulutukset.koulutusdata[areaCode].metadata
          );
          const metadata = R.find(
            R.propEq("kieli", R.toUpper(props.intl.locale)),
            item.metadata
          );
          return {
            anchor: anchorParts[1],
            code: item.koodiArvo,
            title: metadata.nimi,
            categories: R.addIndex(R.map)((language, index) => {
              const isAddition = Math.random() > 0.5;
              return {
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
                          statusTextStyleClasses: isAddition
                            ? ["text-green-600 pr-4 w-20 font-bold"]
                            : ["text-red-500 pr-4 w-20 font-bold"],
                          statusText: isAddition ? " LISÄYS:" : " POISTO:"
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
                          placeholder: "Perustele muutos, kiitos"
                        }
                      }
                    ]
                  }
                ]
              };
            }, changeObj.properties.value),
            metadata: {
              areaCode,
              title: koulutusalaMetadata.nimi
            }
          };
        }, changeObjs || []);
      }, props.changeObjects.tutkintokielet);
    };
    const categories = getCategories();
    onStateUpdate({ categories }, sectionId);
  }, [
    props.changeObjects.tutkintokielet,
    props.koulutukset,
    props.stateObjects.tutkintokielet
  ]);

  return (
    <React.Fragment>
      {!!R.path(["perustelut", "categories"], props.stateObjects) ? (
        <div>
          <h2 className="py-4">Tutkintokielet</h2>
          {R.addIndex(R.map)((categories, index) => {
            const areaCode = categories[0].metadata.areaCode;
            return (
              <ExpandableRowRoot
                anchor={`${sectionId}_${areaCode}`}
                key={`expandable-row-root-${index}`}
                categories={categories}
                changes={R.path(["perustelut", areaCode], props.changeObjects)}
                onChangesRemove={onChangesRemove}
                onUpdate={onChangesUpdate}
                sectionId={sectionId}
                showCategoryTitles={true}
                code={areaCode}
                title={categories[0].metadata.title}
                isExpanded={true}
              />
            );
          }, R.values(R.path(["perustelut", "categories"], props.stateObjects)))}
        </div>
      ) : null}
    </React.Fragment>
  );
});

PerustelutTutkintokielet.defaultValues = {
  changeObjects: {},
  stateObjects: {}
};

PerustelutTutkintokielet.propTypes = {
  changeObjects: PropTypes.object,
  koulutukset: PropTypes.object,
  stateObjects: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func
};

export default injectIntl(PerustelutTutkintokielet);
