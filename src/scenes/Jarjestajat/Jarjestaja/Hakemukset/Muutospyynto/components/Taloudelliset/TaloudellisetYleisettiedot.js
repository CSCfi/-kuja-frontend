import React, { useEffect, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const TaloudellisetYleisettiedot = React.memo(props => {
  const { onStateUpdate } = props;
  const sectionId = "taloudelliset_yleisettiedot";

  const getCategories = useMemo(() => {
    return () => {
      let structure = null;

      structure = [
        {
          anchor: "yleisettiedot",
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
        }
      ];
      return structure;
    };
  }, []);

  useEffect(() => {
    const array = getCategories();
    console.log(array);

    onStateUpdate(
      {
        categories: array
      },
      sectionId
    );
  }, [getCategories, onStateUpdate]);
  return (
    <React.Fragment>
      <p></p>
      {!!R.path(["categories"], props.stateObject) && (
        <ExpandableRowRoot
          title={"Yleiset tiedot"}
          anchor={sectionId}
          key={`taloudelliset-yleisetiedot`}
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

TaloudellisetYleisettiedot.propTypes = {
  changeObjects: PropTypes.object,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};
export default injectIntl(TaloudellisetYleisettiedot);
