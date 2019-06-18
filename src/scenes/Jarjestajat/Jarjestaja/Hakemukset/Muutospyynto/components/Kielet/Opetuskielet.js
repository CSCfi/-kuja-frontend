import React, { useCallback, useContext, useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { KieletContext } from "context/kieletContext";
import { fetchOppilaitoksenOpetuskielet } from "services/kielet/actions";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
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
          props.changes,
          props.intl.locale
        )
      )
    );
  }, [kielet, props.changes, props.kohde, getCategories, props.intl.locale]);

  useEffect(() => {
    fetchOppilaitoksenOpetuskielet()(dispatch);
  }, [dispatch]);

  const [categories, setCategories] = useState([]);
  const [changes] = useState([]);

  return (
    <ExpandableRowRoot
      key={`expandable-row-root`}
      categories={categories}
      changes={changes}
      title={props.intl.formatMessage(wizardMessages.teachingLanguages)}
      isExpanded={true}
    />
  );
};

Opetuskielet.propTypes = {
  changes: PropTypes.array,
  onChanges: PropTypes.func,
  kohde: PropTypes.object
};

export default injectIntl(Opetuskielet);
