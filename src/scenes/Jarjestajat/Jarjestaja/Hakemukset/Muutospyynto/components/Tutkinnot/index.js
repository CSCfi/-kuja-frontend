import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import Section from "../../../../../../../components/03-templates/Section";
import { getCategories } from "../../../../../../../services/muutoshakemus/utils/tutkinnotUtils";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";

const Tutkinnot = React.memo(props => {
  const sectionId = "tutkinnot";
  const changes = [];
  const [state, setState] = useState([]);
  const [koulutusdata, setKoulutusdata] = useState([]);
  const [locale, setLocale] = useState([]);

  useEffect(() => {
    setKoulutusdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.koulutukset.koulutusdata))
    );
  }, [props.koulutukset]);

  useEffect(() => {
    const tmpState = [];
    R.addIndex(R.map)((koulutusala, i) => {
      const areaCode = koulutusala.koodiarvo || koulutusala.koodiArvo;
      const article = getArticle(areaCode, props.lupa.kohteet[1].maaraykset);
      const categories = getCategories(
        i,
        article,
        koulutusala.koulutukset,
        locale
      );
      const title = parseLocalizedField(koulutusala.metadata, locale);
      const changes = [];
      tmpState.push({ areaCode, article, categories, changes, title });
    }, koulutusdata);
    setState(tmpState);
  }, [koulutusdata, locale, props.lupa.kohteet]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    props.onUpdate({ sectionId, state });
  }, [changes]);

  const getArticle = (areaCode, articles = []) => {
    return R.find(article => {
      return article.koodi === areaCode;
    }, articles);
  };

  const onUpdate = payload => {
    setState(prevState => {
      const newState = R.clone(prevState);
      newState[payload.index].changes = payload.changes;
      return newState;
    });
  };

  const removeChanges = (...payload) => {
    return onUpdate({ index: payload[2], changes: [] });
  };

  return (
    <Section
      code={props.lupa.kohteet[1].headingNumber}
      title={props.lupa.kohteet[1].heading}
    >
      {R.addIndex(R.map)((stateItem, i) => {
        return (
          <ExpandableRowRoot
            anchor={stateItem.areaCode}
            key={`expandable-row-root-${i}`}
            categories={stateItem.categories}
            changes={stateItem.changes}
            code={stateItem.areaCode}
            index={i}
            onChangesRemove={removeChanges}
            onUpdate={onUpdate}
            sectionId={sectionId}
            title={stateItem.title}
          />
        );
      }, state)}
    </Section>
  );
});

Tutkinnot.propTypes = {
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  lupa: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(Tutkinnot);
