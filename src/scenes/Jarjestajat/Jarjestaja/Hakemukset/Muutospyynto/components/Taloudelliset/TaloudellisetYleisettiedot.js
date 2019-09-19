import React, { useEffect, useState, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import _ from "lodash";

const TaloudellisetYleisettiedot = React.memo(props => {
  const { onStateUpdate } = props;
  const sectionId = "taloudellisetyleisettiedot";
  const [cats, setCats] = useState([]);

  const getCategories = useMemo(() => {
    return () => {
      let structure = null;

      structure = {
        anchor: sectionId,
        components: [
          {
            anchor: "A",
            name: "taloudellisetyleisettiedot"
          }
        ],
        categories: [
          {
            anchor: "edellytykset-tekstikentta",
            title: "Taloudelliset edellytykset",
            styleClasses: ["mb-6"],
            components: [
              {
                anchor: "A",
                name: "TextBox",
                properties: {
                  placeholder: ""
                }
              }
            ]
          },
          {
            anchor: "Vaikutukset-tekstikentta",
            title: "Vaikutukset taloudellisten resurssien kohdentamiseen",
            styleClasses: ["mb-6"],
            components: [
              {
                anchor: "B",
                name: "TextBox",
                properties: {
                  placeholder: ""
                }
              }
            ]
          },
          {
            anchor: "sopeuttaminen-tekstikentta",
            title: "Toiminnan ja talouden sopeuttaminen",
            styleClasses: [""],
            components: [
              {
                anchor: "C",
                name: "TextBox",
                properties: {
                  placeholder: ""
                }
              }
            ]
          }
        ]
      };
      return structure;
    };
  }, [props.changeObjects]);

  useEffect(() => {
    // for testing only
    setCats(
      {
        categories: getCategories()
      },
      sectionId
    );

    onStateUpdate([
      {
        categories: getCategories()
      },
      sectionId
    ]);
  }, [getCategories]);
  console.log(cats);
  return (
    <React.Fragment>
      <ExpandableRowRoot
        id={sectionId}
        code={"1"}
        title="Yleiset tiedot"
        anchor="additions"
        key={`taloudelliset-yleisetiedot`}
        // categories={props.stateObject.categories}
        categories={cats}
        disableReverting={true}
        hideAmountOfChanges={false}
        showCategoryTitles={true}
        isExpanded={true}
        sectionId={sectionId}
        onUpdate={props.onChangesUpdate}
        {...props}
      />
    </React.Fragment>
  );
});

TaloudellisetYleisettiedot.propTypes = {
  changes: PropTypes.array,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};
export default injectIntl(TaloudellisetYleisettiedot);
