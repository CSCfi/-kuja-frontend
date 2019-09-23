import React, { useEffect, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const TaloudellisetTilinpaatostiedot = React.memo(props => {
  const { sectionId, onStateUpdate } = props;
  const getCategories = useMemo(() => {
    return () => {
      let structure = null;

      structure = [
        {
          anchor: "omavaraisuusaste-input",
          styleClasses: ["flex sm:row mb-6"],
          components: [
            {
              anchor: "A",
              name: "Input",
              properties: {
                withoutMargin: true,
                type: "number",
                width: "12em",
                label: "Omavaraisuusaste"
              }
            }
          ]
        },
        {
          anchor: "maksuvalmius-input",
          styleClasses: ["flex sm:row mb-6"],
          components: [
            {
              anchor: "A",
              name: "Input",
              styleClasses: [""],
              properties: {
                withoutMargin: true,
                type: "number",
                width: "12em",
                label: "Maksuvalmius"
              }
            }
          ]
        },
        {
          anchor: "velkaantuneisuus-input",
          styleClasses: ["flex sm:row mb-6"],
          components: [
            {
              anchor: "A",
              name: "Input",
              styleClasses: [""],
              properties: {
                withoutMargin: true,
                type: "number",
                width: "12em",
                label: "Velkaantuneisuus"
              }
            }
          ]
        },
        {
          anchor: "kannattavuus-input",
          styleClasses: ["flex sm:row mb-6"],
          components: [
            {
              anchor: "A",
              name: "Input",
              styleClasses: [""],
              properties: {
                withoutMargin: true,
                type: "number",
                width: "12em",
                label: "Kannattavuus"
              }
            }
          ]
        },
        {
          anchor: "jaama-input",
          styleClasses: ["flex sm:row mb-6"],
          components: [
            {
              anchor: "A",
              name: "Input",
              styleClasses: [""],
              properties: {
                withoutMargin: true,
                type: "number",
                width: "12em",
                label: "Kumulatiivinen yli- tai alijäämä"
              }
            }
          ]
        }
      ];
      return structure;
    };
  }, []);

  useEffect(() => {
    onStateUpdate(
      {
        categories: getCategories()
      },
      sectionId
    );
  }, [getCategories, onStateUpdate, sectionId]);
  return (
    <React.Fragment>
      {!!R.path(["categories"], props.stateObject) && (
        <ExpandableRowRoot
          title={"Tilinpäätöstiedot"}
          anchor={sectionId}
          key={`taloudelliset-tilinpaatos`}
          categories={props.stateObject.categories}
          changes={R.path(["taloudelliset"], props.changeObjects)}
          disableReverting={true}
          hideAmountOfChanges={false}
          showCategoryTitles={true}
          isExpanded={true}
          sectionId={sectionId}
          onUpdate={props.onChangesUpdate}
          {...props}
        />
      )}
    </React.Fragment>
  );
});

TaloudellisetTilinpaatostiedot.propTypes = {
  changeObjects: PropTypes.object,
  handleChanges: PropTypes.func,
  lupa: PropTypes.object,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};
export default injectIntl(TaloudellisetTilinpaatostiedot);
