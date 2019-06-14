import React, { useContext, useEffect, useState } from "react";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import { fetchKoulutuksetMuut } from "services/koulutukset/actions";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import { MUUT_KEYS } from "../../modules/constants";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import PropTypes from "prop-types";
import * as R from "ramda";

const Kuljettajakoulutukset = props => {
  const koodisto = "kuljettajakoulutus";
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );

  const getCategories = koulutusData => {
    const categories = R.map(item => {
      return {
        components: [
          {
            name: "RadioButtonWithLabel",
            properties: {
              name: "RadioButtonWithLabel",
              code: item.code,
              title: item.title,
              isChecked: item.shouldBeChecked,
              labelStyles: Object.assign(
                {},
                item.isAdded ? isAdded : {},
                item.isInLupa ? isInLupa : {},
                item.isRemoved ? isRemoved : {}
              )
            }
          }
        ]
      };
    }, koulutusData.items);
    return categories;
  };

  useEffect(() => {
    if (R.includes(koodisto, koulutukset.muut.fetched)) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            koulutukset.muut.muudata[koodisto],
            props.changes
          )
        )
      );
    }
  }, [koulutukset.muut, props.changes]);

  useEffect(() => {
    fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS)(koulutuksetDispatch);
  }, [koulutuksetDispatch]);

  const [categories, setCategories] = useState([]);
  const [changes] = useState([]);

  return (
    <Wrapper>
      <ExpandableRow>
        <div data-slot="title">
          <span>{TUTKINNOT_SECTIONS.KULJETTAJAT}</span>
        </div>
        <div data-slot="info">
          <NumberOfChanges changes={props.changes} />
        </div>
        <div data-slot="content">
          <CategorizedListRoot
            categories={categories}
            changes={changes}
            showCategoryTitles={true}
          />
        </div>
      </ExpandableRow>
    </Wrapper>
  );
};

Kuljettajakoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default Kuljettajakoulutukset;
