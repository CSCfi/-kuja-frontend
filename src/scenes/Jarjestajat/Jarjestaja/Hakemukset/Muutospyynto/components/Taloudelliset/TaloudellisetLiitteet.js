import React, { useEffect, useMemo } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const TaloudellisetLiitteet = React.memo(props => {
  const { onStateUpdate, sectionId } = props;

  const getCategories = useMemo(() => {
    return () => {
      let structure = null;

      structure = [
        {
          anchor: "taloudelliset",
          anchor: "liitteet",
          components: [
            {
              name: "StatusTextRow",
              styleClasses: ["w-full"],
              properties: {
                title:
                  "Liittäkää asiakirja tai asiakirjat, joista ilmenee hakemuksen hyväksyntä tai hyväksyjän päätösvalta (esim. hyväksyjän allekirjoitusoikeus ja päättävän elimen kokouksen pöytäkirjanote). Liitteen koko saa olla korkeintaan 25 MB ja tyypiltään pdf, word, excel, jpeg tai gif. Muistakaa merkitä salassa pidettävät liitteet."
              }
            },
            {
              styleClasses: ["w-full"],
              anchor: "A",
              name: "Attachments"
            }
          ]
        }
      ];
      return structure;
    };
  }, []);

  useEffect(() => {
    const array = getCategories();

    onStateUpdate(
      {
        categories: array
      },
      sectionId
    );
  }, [getCategories, onStateUpdate, sectionId]);
  return (
    <React.Fragment>
      {!!R.path(["categories"], props.stateObject) && (
        <ExpandableRowRoot
          title={"Liitteet"}
          anchor={sectionId}
          key={`taloudelliset-liitteet`}
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

TaloudellisetLiitteet.propTypes = {
  changeObjects: PropTypes.object,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object,
  onStateUpdate: PropTypes.func,
  stateObject: PropTypes.object
};
export default injectIntl(TaloudellisetLiitteet);
