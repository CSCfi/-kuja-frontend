import React, { useContext, useEffect, useState } from "react";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import ExpandableRow from "components/01-molecules/ExpandableRow";
import { MUUT_KEYS } from "../../modules/constants";
import { TUTKINNOT_SECTIONS } from "../../../../modules/constants";
import { fetchKoulutuksetMuut } from "services/koulutukset/actions";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import PropTypes from "prop-types";
import * as R from "ramda";

const AmmatilliseenTehtavaanValmistavatKoulutukset = props => {
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
    if (
      R.includes(
        "ammatilliseentehtavaanvalmistavakoulutus",
        koulutukset.muut.fetched
      )
    ) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            koulutukset.muut.muudata.ammatilliseentehtavaanvalmistavakoulutus,
            props.changes
          )
        )
      );
    }
  }, [koulutukset.muut, props.changes]);

  useEffect(() => {
    fetchKoulutuksetMuut(MUUT_KEYS.AMMATILLISEEN_TEHTAVAAN_VALMISTAVA_KOULUTUS)(
      koulutuksetDispatch
    );
  }, [koulutuksetDispatch]);

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  return (
    <Wrapper>
      <ExpandableRow changes={props.changes}>
        <div data-slot="title">
          <span>{TUTKINNOT_SECTIONS.VALMISTAVAT}</span>
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

AmmatilliseenTehtavaanValmistavatKoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default AmmatilliseenTehtavaanValmistavatKoulutukset;
