import React, { useContext, useEffect, useState } from "react";
import { fetchKoulutus } from "services/koulutukset/actions";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import PropTypes from "prop-types";
import * as R from "ramda";

const ValmentavatKoulutukset = props => {
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );

  const getCategories = koulutusData => {
    const categories = R.map(item => {
      return {
        components: [
          {
            name: "CheckboxWithLabel",
            properties: {
              name: "CheckboxWithLabel",
              code: item.code,
              title: item.title,
              isChecked: item.shouldBeChecked,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved,
                custom: Object({}, item.isInLupa ? isInLupa : {})
              }
            }
          }
        ]
      };
    }, koulutusData.items);
    return categories;
  };

  useEffect(() => {
    if (koulutukset.poikkeukset.fetched.length === 2) {
      setCategories(
        getCategories(
          getDataForKoulutusList(koulutukset.poikkeukset.data, props.changes)
        )
      );
    }
  }, [koulutukset.poikkeukset, props.changes]);

  useEffect(() => {
    fetchKoulutus("999901")(koulutuksetDispatch);
    fetchKoulutus("999903")(koulutuksetDispatch);
  }, [koulutuksetDispatch]);

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  return (
    <Wrapper>
      <ExpandableRow>
        <div data-slot="title">
          <span>{TUTKINNOT_SECTIONS.POIKKEUKSET}</span>
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

ValmentavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default ValmentavatKoulutukset;
