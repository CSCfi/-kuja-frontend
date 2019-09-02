import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { getCategoriesForPerustelut } from "../../../../../../../services/muutoshakemus/utils/tutkinnotUtils";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const defaultProps = {
  backendChanges: [],
  kohde: {},
  koulutukset: {},
  lomakkeet: {},
  lupa: {},
  maaraystyyppi: {},
  muutosperustelut: {}
};

const PerustelutTutkinnot = React.memo(
  ({
    backendChanges = defaultProps.backendChanges,
    intl,
    kohde = defaultProps.kohde,
    koulutukset = defaultProps.koulutukset,
    lomakkeet = defaultProps.lomakkeet,
    lupa = defaultProps.lupa,
    maaraystyyppi = defaultProps.maaraystyyppi,
    onUpdate
  }) => {
    const sectionId = "tutkinnot";
    const [state, setState] = useState([]);
    const [koulutusdata, setKoulutusdata] = useState([]);
    const [locale, setLocale] = useState([]);

    useEffect(() => {
      setKoulutusdata(
        R.sortBy(R.prop("koodiArvo"), R.values(koulutukset.koulutusdata))
      );
    }, [koulutukset]);

    useEffect(() => {
      const getArticle = (areaCode, articles = []) => {
        return R.find(article => {
          return article.koodi === areaCode;
        }, articles);
      };

      const handleKoulutusdata = (koulutusdata, _changes) => {
        return R.addIndex(R.map)((koulutusala, i) => {
          const areaCode = koulutusala.koodiarvo || koulutusala.koodiArvo;
          const article = getArticle(areaCode, lupa.kohteet[1].maaraykset);
          const categories = getCategoriesForPerustelut(
            i,
            article,
            koulutusala.koulutukset,
            kohde,
            maaraystyyppi,
            locale,
            backendChanges,
            areaCode,
            lomakkeet
          );
          const title = parseLocalizedField(koulutusala.metadata, locale);
          const changes = R.filter(changeObj => {
            return R.equals(
              R.compose(
                R.view(R.lensIndex(0)),
                R.split(".")
              )(changeObj.anchor),
              areaCode
            );
          }, _changes);
          return { areaCode, article, categories, changes, title };
        }, koulutusdata);
      };
      setState(handleKoulutusdata(koulutusdata, backendChanges));
    }, [
      koulutusdata,
      locale,
      backendChanges,
      kohde,
      lomakkeet,
      lupa.kohteet,
      maaraystyyppi,
    ]);

    useEffect(() => {
      setLocale(R.toUpper(intl.locale));
    }, [intl.locale]);

    useEffect(() => {
      onUpdate({ sectionId, items: [...state] });
    }, [onUpdate, state]);

    const saveChanges = payload => {
      setState(prevState => {
        const newState = _.cloneDeep(prevState);
        if (!newState[payload.index]) {
          newState[payload.index] = {};
        }
        newState[payload.index].changes = payload.changes;
        return newState;
      });
    };

    const removeChanges = (...payload) => {
      return saveChanges({ index: payload[2], changes: [] });
    };

    return (
      <React.Fragment>
        {R.addIndex(R.map)((stateItem, i) => {
          return stateItem.categories.length ? (
            <ExpandableRowRoot
              anchor={stateItem.areaCode}
              key={`expandable-row-root-${i}`}
              categories={stateItem.categories}
              changes={stateItem.changes}
              code={stateItem.areaCode}
              disableReverting={true}
              hideAmountOfChanges={false}
              index={i}
              isExpanded={true}
              onChangesRemove={removeChanges}
              onUpdate={saveChanges}
              sectionId={sectionId}
              title={stateItem.title}
            />
          ) : null;
        }, state)}
      </React.Fragment>
    );
  }
);

PerustelutTutkinnot.propTypes = {
  backendChanges: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  lomakkeet: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  muutosperustelut: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(PerustelutTutkinnot);
