import React, { useCallback, useEffect, useState, setState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { getDataForOpetuskieletList } from "../../../../../../../services/kielet/opetuskieletUtil";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import { parseLocalizedField } from "../../../../../../../modules/helpers";

const Opetuskielet = props => {
  const sectionId = "opetuskielet";
  const [categories, setCategories] = useState([]);
  // const [changes, setChanges] = useState([]);
  const changes = [];
  const [opetuskielet, setOpetuskieletdata] = useState([]);
  const [state, setState] = useState([]);
  const [locale, setLocale] = useState([]);
  const { onUpdate } = props;

  const getCategories = opetuskielet => {
    if (opetuskielet.items)
      return R.map(item => {
        return {
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                name: "CheckboxWithLabel",
                isChecked: item.shouldBeSelected || item.isInLupa,
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
      }, opetuskielet.items);
  };

  useEffect(() => {
    setOpetuskieletdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.kielet.opetuskielet))
    );
  }, [props.kielet]);

  useEffect(() => {
    const tmpState = [];
    R.addIndex(R.map)((kieli, i) => {
      const areaCode = kieli.koodiarvo || kieli.koodiArvo;
      const article = getArticle(areaCode, props.lupa.kohteet[1].maaraykset);
      const categories = getCategories(
        // getDataForOpetuskieletList(
        //   kieli.opetuskielet,
        //   props.kohde,
        //   props.changes,
        //   locale
        // )
        i,
        article,
        kieli.opetuskielet,
        props.kohde,
        props.changes,
        locale
      );
      const title = parseLocalizedField(kieli.metadata, locale);
      const changes = [];
      tmpState.push({ areaCode, article, categories, changes, title });
    }, opetuskielet);
    setState(tmpState);
  }, [opetuskielet, locale, props.kohde, props.maaraystyyppi]);

  useEffect(() => {
    setCategories(
      getCategories(
        getDataForOpetuskieletList(
          props.kielet.opetuskielet,
          props.kohde,
          props.changes,
          props.intl.locale
        )
      )
    );
  }, [
      props.kielet.opetuskielet,
      props.changes,
      props.kohde,
      getCategories,
      props.intl.locale
    ]);

  // const onUpdate = payload => {
  //   setChanges(payload.changes);
  // };

  const removeChanges = (...payload) => {
    // return onUpdate({ changes: [] });
    return saveChanges({ index: payload[2], changes: [] });
  };

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    onUpdate({ sectionId, state });
  }, [changes, onUpdate, state]);

  const getArticle = (areaCode, articles = []) => {
    return R.find(article => {
      return article.koodi === areaCode;
    }, articles);
  };

  const saveChanges = payload => {
    setState(prevState => {
      const newState = R.clone(prevState);
      newState.changes = payload.changes;
      return newState;
    });
    console.log(state.changes);
  };

  return (
    <ExpandableRowRoot
      key={`expandable-row-root`}
      categories={categories}
      changes={state.changes}
      index={0}
      onChangesRemove={removeChanges}
      onUpdate={saveChanges}
      sectionId={sectionId}
      title={props.intl.formatMessage(wizardMessages.teachingLanguages)}
      isExpanded={true}
    />
  );
};

// Opetuskielet.defaultProps = {
//   changes: []
// };

Opetuskielet.propTypes = {
  changes: PropTypes.array,
  kielet: PropTypes.object,
  onUpdate: PropTypes.func,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(Opetuskielet);
