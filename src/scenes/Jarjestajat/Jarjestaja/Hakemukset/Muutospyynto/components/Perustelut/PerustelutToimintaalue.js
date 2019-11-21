import React, { useEffect, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

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
      return changeObj => {
        return {
          anchor: R.join(".", R.tail(R.split(".", changeObj.anchor))),
          components: [
            {
              anchor: "A",
              name: "TextBox",
              properties: {
                forChangeObject: changeObj.properties.metadata,
                isReadOnly,
                placeholder: "Kirjoita perustelut tähän...",
                title:
                  changeObj.properties.title ||
                  R.path(["properties", "metadata", "title"], changeObj)
              }
            }
          ]
        };
      };
    }, [isReadOnly]);

    const getCategories = useMemo(() => {
      const lisaykset = R.filter(
        R.pathEq(["properties", "isChecked"], true),
        changeObjects.toimintaalue
      );
      const poistot = R.filter(
        R.pathEq(["properties", "isChecked"], false),
        changeObjects.toimintaalue
      );
      return () => {
        return {
          additions: R.map(changeObj => {
            return getLomake(changeObj);
          }, lisaykset),
          removals: R.map(changeObj => {
            return getLomake(changeObj);
          }, poistot)
        };
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
        {R.path(["categories", "additions"], stateObjects.perustelut) &&
        R.path(["categories", "additions"], stateObjects.perustelut).length ? (
          <ExpandableRowRoot
            anchor={`${sectionId}_additions`}
            key={`perustelut-toimintaalue-lisattavat`}
            categories={R.path(
              ["categories", "additions"],
              stateObjects.perustelut
            )}
            changes={R.path(["perustelut", "additions"], changeObjects)}
            disableReverting={true}
            hideAmountOfChanges={false}
            isExpanded={true}
            onUpdate={onChangesUpdate}
            sectionId={sectionId}
            showCategoryTitles={true}
            title="Lupaan lisättävät"
          />
        ) : null}
        {R.path(["categories", "removals"], stateObjects.perustelut) &&
        R.path(["categories", "removals"], stateObjects.perustelut).length ? (
          <ExpandableRowRoot
            anchor={`${sectionId}_removals`}
            key={`perustelut-toimintaalue-poistettavat`}
            categories={R.path(
              ["categories", "removals"],
              stateObjects.perustelut
            )}
            changes={R.path(["perustelut", "removals"], changeObjects)}
            disableReverting={true}
            hideAmountOfChanges={false}
            isExpanded={true}
            onUpdate={onChangesUpdate}
            sectionId={sectionId}
            showCategoryTitles={true}
            title="Luvasta poistettavat"
          />
        ) : null}
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
