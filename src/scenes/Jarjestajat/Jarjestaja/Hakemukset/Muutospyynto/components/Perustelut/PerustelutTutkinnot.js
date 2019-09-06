import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { getCategoriesForPerustelut } from "../../../../../../../services/muutoshakemus/utils/tutkinnotUtils";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";
import {
  curriedGetAnchorPartsByIndex,
  getAnchorsStartingWith
} from "../../../../../../../utils/common";

const defaultProps = {
  changeObjects: {},
  kohde: {},
  koulutukset: {},
  lomakkeet: {},
  lupa: {},
  maaraystyyppi: {},
  muutosperustelut: {}
};

const PerustelutTutkinnot = React.memo(
  ({
    changeObjects = defaultProps.changeObjects,
    intl,
    kohde = defaultProps.kohde,
    koulutukset = defaultProps.koulutukset,
    lomakkeet = defaultProps.lomakkeet,
    lupa = defaultProps.lupa,
    maaraystyyppi = defaultProps.maaraystyyppi,
    onChangesRemove,
    onChangesUpdate,
    onStateUpdate
  }) => {
    const sectionId = "perustelut_tutkinnot";
    const [items, setItems] = useState([]);
    const [tutkinnotChanges, setTutkinnotChanges] = useState({});
    // const [changes, setChanges] = useState([]);
    const [koulutusdata, setKoulutusdata] = useState([]);
    const [locale, setLocale] = useState([]);

    useEffect(() => {
      const sortedKoulutusData = R.sortBy(
        R.prop("koodiArvo"),
        R.values(koulutukset.koulutusdata)
      );
      setKoulutusdata(sortedKoulutusData);
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
          const anchorInitial = `tutkinnot_${areaCode}`;
          const article = getArticle(areaCode, lupa.kohteet[1].maaraykset);
          const areaChanges = R.prop(anchorInitial, _changes);
          const categories = areaChanges
            ? getCategoriesForPerustelut(
                i,
                article,
                koulutusala.koulutukset,
                kohde,
                maaraystyyppi,
                locale,
                R.prop(anchorInitial, _changes) || [],
                anchorInitial,
                lomakkeet
              )
            : [];
          const title = parseLocalizedField(koulutusala.metadata, locale);
          return { areaCode, article, categories, title };
        }, koulutusdata);
      };

      if (koulutusdata.length) {
        const nextItems = handleKoulutusdata(koulutusdata, tutkinnotChanges);
        if (nextItems.length) {
          setItems(nextItems);
        } else {
          console.warn("Next state would be incorrect!", nextItems);
        }
      }
    }, [
      koulutusdata,
      locale,
      tutkinnotChanges,
      kohde,
      lomakkeet,
      lupa.kohteet,
      maaraystyyppi
    ]);

    useEffect(() => {
      setLocale(R.toUpper(intl.locale));
    }, [intl.locale]);

    // useEffect(() => {
    //   if (items) {
    //     runOnChanges({
    //       sectionId,
    //       changes: R.compose(
    //         R.flatten,
    //         R.values
    //       )(changes)
    //     });
    //   }
    // }, [changes, runOnChanges]);

    // useEffect(() => {
    //   if (items) {
    //     onStateUpdate({
    //       sectionId,
    //       state: {
    //         items
    //       }
    //     });
    //   }
    // }, [items, onStateUpdate]);

    // const saveChanges = payload => {
    //   setChanges(prevChanges => {
    //     const nextChanges = {
    //       ...prevChanges,
    //       [payload.anchor]: payload.changes
    //     };
    //     return nextChanges;
    //   });
    // };

    // const removeChanges = (...payload) => {
    //   return saveChanges({ index: payload[2], changes: [] });
    // };

    // useEffect(() => {
    //   if (changeObjects.perustelut) {
    //     const anchorInitials = R.uniq(
    //       curriedGetAnchorPartsByIndex(changeObjects.perustelut, 0)
    //     );
    //     const nextChanges = R.mergeAll(
    //       R.map(anchorInitial => {
    //         return {
    //           [anchorInitial]: getAnchorsStartingWith(
    //             anchorInitial,
    //             changeObjects.perustelut
    //           )
    //         };
    //       }, anchorInitials)
    //     );
    //     // if (!R.equals(changes, nextChanges)) {
    //     setChanges(nextChanges);
    //     // }
    //   }
    // }, [changeObjects.perustelut]);

    useEffect(() => {
      if (changeObjects.tutkinnot) {
        const anchorInitials = R.uniq(
          curriedGetAnchorPartsByIndex(changeObjects.tutkinnot, 0)
        );
        const nextChanges = R.mergeAll(
          R.map(anchorInitial => {
            return {
              [anchorInitial]: getAnchorsStartingWith(
                anchorInitial,
                changeObjects.tutkinnot
              )
            };
          }, anchorInitials)
        );
        if (!R.equals(tutkinnotChanges, nextChanges)) {
          setTutkinnotChanges(nextChanges);
        }
      }
    }, [tutkinnotChanges, changeObjects.tutkinnot]);

    return (
      <React.Fragment>
        {R.addIndex(R.map)((stateItem, i) => {
          const anchorInitial = `${sectionId}_${stateItem.areaCode}`;
          console.info(
            changeObjects,
            R.path(
              ["perustelut", "tutkinnot", stateItem.areaCode],
              changeObjects
            )
          );
          return stateItem.categories.length ? (
            <ExpandableRowRoot
              anchor={anchorInitial}
              key={`expandable-row-root-${i}`}
              categories={stateItem.categories}
              changes={R.path(
                ["perustelut", "tutkinnot", stateItem.areaCode],
                changeObjects
              )}
              code={stateItem.areaCode}
              disableReverting={false}
              hideAmountOfChanges={false}
              index={i}
              isExpanded={true}
              onChangesRemove={onChangesRemove}
              onUpdate={onChangesUpdate}
              sectionId={sectionId}
              title={stateItem.title}
            />
          ) : null;
        }, items)}
      </React.Fragment>
    );
  }
);

PerustelutTutkinnot.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  lomakkeet: PropTypes.object,
  lupa: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  muutosperustelut: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func,
  onStateUpdate: PropTypes.func
};

export default injectIntl(PerustelutTutkinnot);
