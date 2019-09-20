import React, { useEffect, useState, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import _ from "lodash";

const TaloudellisetInvestoinnit = React.memo(props => {
  const { sectionId, onStateUpdate } = props;
  const [cats, setCats] = useState([]);

  const getCategories = useMemo(() => {
    return () => {
      let structure = null;

      structure = {
        anchor: sectionId,
        components: [
          {
            anchor: "A",
            name: "taloudellisetinvestoinnit"
          }
        ],
        categories: [
          {
            anchor: "investoinnit-tekstikentta",
            title: "Tarvittavat investoinnit",
            styleClasses: ["mb-6 font-normal"],
            components: [
              {
                anchor: "label",
                name: "TextBox",
                properties: {
                  placeholder: ""
                }
              }
            ]
          },
          {
            anchor: "kustannukset-header",
            styleClasses: [""],
            components: [
              {
                anchor: "label",
                name: "StatusTextRow",
                styleClasses: ["font-semibold text-base mb-2"],
                properties: {
                  title: "Investoinnin kustannukset"
                }
              }
            ]
          },
          {
            anchor: "vuodet",
            styleClasses: ["flex sm:row mb-6"],
            components: [
              {
                anchor: "A",
                name: "Input",
                styleClasses: [""],
                properties: {
                  withoutMargin: true,
                  type: "number",
                  width: "8em"
                }
              }
            ]
          },
          {
            anchor: "rahoitus-tekstikentta",
            title: "Investointien rahoitus",
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
        title="Investoinnit"
        anchor="investoinnit"
        key={`taloudelliset-investoinnit`}
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

TaloudellisetInvestoinnit.propTypes = {
  changes: PropTypes.array,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};
export default injectIntl(TaloudellisetInvestoinnit);
