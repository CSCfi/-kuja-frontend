import React, { useEffect, useMemo, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import Section from "../../../../../../../components/03-templates/Section";
import { getCategories } from "../../../../../../../services/muutoshakemus/utils/tutkinnotUtils";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";
import {
  curriedGetAnchorPartsByIndex,
  getAnchorsStartingWith
} from "../../../../../../../utils/common";

const Tutkinnot = React.memo(props => {
  const sectionId = "tutkinnot";
  const [changes, setChanges] = useState({});
  const [items, setItems] = useState(null);
  const { onChangesUpdate, onStateUpdate } = props;

  const koulutusdata = useMemo(() => {
    return R.sortBy(
      R.prop("koodiArvo"),
      R.values(props.koulutukset.koulutusdata)
    );
  }, [props.koulutukset.koulutusdata]);

  useEffect(() => {
    const locale = R.toUpper(props.intl.locale);
    const getArticle = (areaCode, articles = []) => {
      return R.find(article => {
        return article.koodi === areaCode;
      }, articles);
    };
    const handleKoulutusdata = (koulutusdata, _changes) => {
      return R.addIndex(R.map)((koulutusala, i) => {
        const areaCode = koulutusala.koodiarvo || koulutusala.koodiArvo;
        const article = getArticle(areaCode, props.lupa.kohteet[1].maaraykset);
        const categories = getCategories(
          i,
          article,
          koulutusala.koulutukset,
          props.kohde,
          props.maaraystyyppi,
          locale
        );
        const title = parseLocalizedField(koulutusala.metadata, locale);
        return { areaCode, article, categories, title };
      }, koulutusdata);
    };
    const nextItems = handleKoulutusdata(koulutusdata, props.changeObjects);
    if (!R.equals(items, nextItems)) {
      setItems(nextItems);
    }
  }, [
    items,
    koulutusdata,
    props.intl.locale,
    props.locale,
    props.changeObjects,
    props.kohde,
    props.koulutukset,
    props.lupa.kohteet,
    props.maaraystyyppi
  ]);

  useEffect(() => {
    if (items) {
      onChangesUpdate({
        sectionId,
        changes: R.compose(
          R.flatten,
          R.values
        )(changes)
      });
    }
  }, [changes, onChangesUpdate]);

  useEffect(() => {
    if (items) {
      onStateUpdate({
        sectionId,
        state: {
          items
        }
      });
    }
  }, [items, onStateUpdate]);

  const saveChanges = payload => {
    setChanges(prevChanges => {
      const nextChanges = {
        ...prevChanges,
        [payload.anchor]: payload.changes
      };
      return nextChanges;
    });
  };

  const removeChanges = (...payload) => {
    return saveChanges({ anchor: payload[1], changes: [] });
  };

  useEffect(() => {
    const anchorInitials = R.uniq(
      curriedGetAnchorPartsByIndex(props.changeObjects, 0)
    );
    const nextChanges = R.mergeAll(
      R.map(anchorInitial => {
        return {
          [anchorInitial]: getAnchorsStartingWith(
            anchorInitial,
            props.changeObjects
          )
        };
      }, anchorInitials)
    );
    if (!R.equals(changes, nextChanges)) {
      setChanges(nextChanges);
    }
  }, [props.changeObjects]);

  return (
    <React.Fragment>
      {items && (
        <Section
          code={props.lupa.kohteet[1].headingNumber}
          title={props.lupa.kohteet[1].heading}
        >
          {R.addIndex(R.map)((stateItem, i) => {
            const anchorInitial = `${sectionId}_${stateItem.areaCode}`;
            return (
              <ExpandableRowRoot
                anchor={anchorInitial}
                key={`expandable-row-root-${i}`}
                categories={stateItem.categories}
                changes={changes[anchorInitial]}
                code={stateItem.areaCode}
                onChangesRemove={removeChanges}
                onUpdate={saveChanges}
                sectionId={sectionId}
                showCategoryTitles={true}
                title={stateItem.title}
              />
            );
          }, items)}
        </Section>
      )}
    </React.Fragment>
  );
});

Tutkinnot.defaultProps = {
  changeObjects: [],
  maaraystyyppi: {}
};

Tutkinnot.propTypes = {
  changeObjects: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func
};

export default injectIntl(Tutkinnot);
