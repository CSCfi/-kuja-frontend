import React, { useContext, useEffect, useState } from "react";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { getDataForKoulutusList } from "services/koulutukset/koulutusUtil";
import { fetchKoulutuksetMuut } from "services/koulutukset/actions";
import { Wrapper } from "../MuutospyyntoWizardComponents";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import ExpandableRow from "../../../../../../../components/02-organisms/ExpandableRowRoot/ExpandableRow";
import { MUUT_KEYS } from "../../modules/constants";
import CategorizedListRoot from "components/02-organisms/CategorizedListRoot";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import { injectIntl } from "react-intl";
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
    if (R.includes(koodisto, koulutukset.muut.fetched)) {
      setCategories(
        getCategories(
          getDataForKoulutusList(
            koulutukset.muut.muudata[koodisto],
            props.changes,
            R.toUpper(props.intl.locale)
          )
        )
      );
    }
  }, [koulutukset.muut, props.changes, props.intl.locale]);

  useEffect(() => {
    fetchKoulutuksetMuut(MUUT_KEYS.KULJETTAJAKOULUTUS)(koulutuksetDispatch);
  }, [koulutuksetDispatch]);

  const [categories, setCategories] = useState([]);
  const [changes, setChanges] = useState([]);

  return (
    <Wrapper>
      <ExpandableRow>
        <div data-slot="title">
          <span>{props.intl.formatMessage(wizardMessages.driverTraining)}</span>
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

Kuljettajakoulutukset.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func
};

export default injectIntl(Kuljettajakoulutukset);
