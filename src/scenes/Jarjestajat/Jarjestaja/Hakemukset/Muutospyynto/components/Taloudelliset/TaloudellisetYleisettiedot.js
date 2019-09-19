import React, { useEffect, useState, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import FormSection from "../../../../../../../components/03-templates/FormSection";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const defaultProps = {
  changes: [],
  kohde: {},
  lupa: {}
};

const TaloudellisetYleisettiedot = React.memo(({ props }) => {
  const sectionId = "taloudellisetyleisettiedot";
  const item = { componentName: "test", koodiArvo: 2 };

  const getCategories = useMemo(() => {
    return {
      anchor: item.koodiArvo,
      components: [
        {
          anchor: "A",
          name: item.componentName,
          properties: {
            name: item.componentName,
            title: "",
            styleClasses: ["flex"]
          }
        }
      ]
    };
  });

  let groupedChanges = false;
  const cats = getCategories;
  return (
    <React.Fragment>
      {R.compose(
        R.not,
        R.isEmpty
      )(groupedChanges) ? (
        <FormSection
          id={sectionId}
          sectionChanges={groupedChanges}
          code={1}
          title={""}
          // runOnChanges={handleChanges}
          render={props => (
            <React.Fragment>
              <ExpandableRowRoot
                anchor="additions"
                key={`taloudelliset-yleisetiedot`}
                categories={cats}
                // changes={props.sectionChanges.additions}
                disableReverting={true}
                hideAmountOfChanges={false}
                showCategoryTitles={true}
                isExpanded={true}
                sectionId={sectionId}
                title="Yleiset tiedot"
                {...props}
              />
            </React.Fragment>
          )}
        />
      ) : null}
    </React.Fragment>
  );
});

TaloudellisetYleisettiedot.propTypes = {
  changes: PropTypes.array,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};
export default injectIntl(TaloudellisetYleisettiedot);
