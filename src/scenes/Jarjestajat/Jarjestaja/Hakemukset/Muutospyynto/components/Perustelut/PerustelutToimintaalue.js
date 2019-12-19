import React, { useEffect, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

import "./perustelut-toiminta-alue.module.css";

const defaultProps = {
  changeObjects: {},
  isReadOnly: false,
  kohde: {},
  lupa: {},
  stateObjects: {}
};

const PerustelutToimintaalue = React.memo(
  ({
    changeObjects = defaultProps.changeObjects,
    isReadOnly = defaultProps.isReadOnly,
    onStateUpdate,
    onChangesUpdate,
    sectionId,
    stateObjects = defaultProps.stateObjects
  }) => {
    const getLomake = useMemo(() => {
      return () => {
        return {
          anchor: "reasoning",
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                isReadOnly,
                placeholder: "Kirjoita perustelut"
              }
            }
          ]
        };
      };
    }, [isReadOnly]);

    const getCategories = useMemo(() => {
      return () => {
        return [
          {
            anchor: "changes",
            layout: { indentation: "none", margins: { top: "none" } },
            categories: [
              {
                anchor: "removed",
                layout: { indentation: "none", margins: { top: "none" } },
                title: "Poistettava",
                components: R.map(changeObj => {
                  let json = null;
                  if (R.equals(changeObj.properties.isChecked, false)) {
                    json = {
                      name: "StatusTextRow",
                      layout: { dense: true },
                      properties: {
                        title:
                          changeObj.properties.metadata.title ||
                          changeObj.properties.metadata.label
                      }
                    };
                  }
                  return json;
                }, changeObjects.toimintaalue).filter(Boolean)
              },
              {
                anchor: "added",
                layout: {
                  margins: { top: "none" },
                  components: { vertical: true }
                },
                title: "Lisättävä",
                components: R.map(changeObj => {
                  let json = null;
                  if (R.equals(changeObj.properties.isChecked, true)) {
                    json = {
                      name: "StatusTextRow",
                      layout: { dense: true },
                      properties: {
                        title:
                          changeObj.properties.metadata.title ||
                          changeObj.properties.metadata.label
                      }
                    };
                  }
                  return json;
                }, changeObjects.toimintaalue).filter(Boolean)
              }
            ]
          },
          getLomake()
        ];
      };
    }, [changeObjects.toimintaalue, getLomake]);

    useEffect(() => {
      const categories = getCategories();
      onStateUpdate({
        categories
      });
    }, [getCategories, onStateUpdate]);

    return (
      <React.Fragment>
        {stateObjects.perustelut && (
          <ExpandableRowRoot
            anchor={sectionId}
            key={`perustelut-toimintaalue-lisattavat`}
            categories={stateObjects.perustelut.categories}
            changes={changeObjects.perustelut}
            disableReverting={true}
            hideAmountOfChanges={false}
            isExpanded={true}
            onUpdate={onChangesUpdate}
            sectionId={sectionId}
            showCategoryTitles={true}
            title="Muutokset"
          />
        )}
      </React.Fragment>
    );
  }
);

PerustelutToimintaalue.propTypes = {
  changeObjects: PropTypes.object,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  isReadOnly: PropTypes.bool,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  stateObjects: PropTypes.object
};

export default injectIntl(PerustelutToimintaalue);
