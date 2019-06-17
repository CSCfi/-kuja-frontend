import React, { useCallback, useContext, useEffect, useState } from "react";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import { getDataForOpetuskieletList } from "services/kielet/opetuskieletUtil";
import { MUUTOS_WIZARD_TEKSTIT } from "../../modules/constants";
import { KieletContext } from "context/kieletContext";
import { fetchOppilaitoksenOpetuskielet } from "services/kielet/actions";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import PropTypes from "prop-types";
import * as R from "ramda";

const Opetuskielet = props => {
  const { state: kielet, dispatch } = useContext(KieletContext);

  const getCategories = useCallback(({ items }) => {
    return R.map(item => {
      return {
        components: [
          {
            name: "CheckboxWithLabel",
            properties: {
              name: "CheckboxWithLabel",
              isChecked: item.shouldBeSelected,
              title: item.title,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved,
                custom: Object.assign({}, item.isInLupa ? isInLupa : {})
              }
            }
          }
        ]
      };
    }, items);
  }, []);

  useEffect(() => {
    setCategories(
      getCategories(
        getDataForOpetuskieletList(
          kielet.data.opetuskielet,
          props.kohde,
          props.changes
        )
      )
    );
  }, [kielet, props.changes, props.kohde, getCategories]);

  useEffect(() => {
    fetchOppilaitoksenOpetuskielet()(dispatch);
  }, [dispatch]);

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  return (
    <Wrapper>
      <ExpandableRow shouldBeExpanded={true}>
        <div data-slot="title">
          {MUUTOS_WIZARD_TEKSTIT.MUUTOS_OPETUSKIELET.HEADING.FI}
        </div>
        <div data-slot="info">
          <NumberOfChanges changes={changes} />
        </div>
        <div data-slot="content">
          <CategorizedListRoot
            categories={categories}
            changes={changes}
            onUpdate={setChanges}
            showCategoryTitles={true}
          />
        </div>
      </ExpandableRow>
    </Wrapper>
  );
};

Opetuskielet.propTypes = {
  changes: PropTypes.array,
  listId: PropTypes.string,
  onChanges: PropTypes.func,
  kohde: PropTypes.object
};

export default Opetuskielet;
