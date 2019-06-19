import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import { MUUTOS_TYPES } from "../../modules/uusiHakemusFormConstants";
import { findKieliByKoodi } from "../../../../../../../services/kielet/kieliUtil";
import PropTypes from "prop-types";
import * as R from "ramda";
import _ from "lodash";

const Tutkintokielet = props => {
  const [defaultLanguage, setDefaultLanguage] = useState({});
  const [koulutusdata, setKoulutusdata] = useState([]);

  useEffect(() => {
    setKoulutusdata(
      R.sortBy(R.prop("koodiArvo"), R.values(props.koulutukset.koulutusdata))
    );
  }, [props.koulutukset]);

  useEffect(() => {
    const language = findKieliByKoodi(props.kielet, "FI");
    setDefaultLanguage({
      label: parseLocalizedField(language.metadata, props.locale),
      value: language.koodiArvo
    });
  }, [props.kielet, props.locale]);

  const getArticle = (areaCode, articles = []) => {
    return R.find(article => {
      return article.koodi === areaCode;
    }, articles);
  };

  const getCategories = (article, koulutustyypit) => {
    return R.values(
      R.map(koulutustyyppi => {
        return {
          code: koulutustyyppi.koodiArvo,
          title:
            _.find(koulutustyyppi.metadata, m => {
              return m.kieli === props.locale;
            }).nimi || "[Koulutustyypin otsikko tähän]",
          categories: _.map(koulutustyyppi.koulutukset, koulutus => {
            const labelClasses = {
              isAdded: !!_.find(
                _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
                { type: MUUTOS_TYPES.ADDITION }
              ),
              isInLupa: article
                ? !!_.find(article.koulutusalat, koulutusala => {
                    return !!_.find(koulutusala.koulutukset, {
                      koodi: koulutus.koodiArvo
                    });
                  })
                : false,
              isRemoved: !!_.find(
                _.filter(props.changes, { koodiarvo: koulutus.koodiArvo }),
                { type: MUUTOS_TYPES.REMOVAL }
              )
            };
            return {
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    name: "CheckboxWithLabel",
                    code: koulutus.koodiArvo,
                    title:
                      _.find(koulutus.metadata, m => {
                        return m.kieli === props.locale;
                      }).nimi || "[Koulutuksen otsikko tähän]",
                    labelStyles: {
                      addition: isAdded,
                      removal: isRemoved,
                      custom: Object.assign(
                        {},
                        labelClasses.isInLupa ? isInLupa : {}
                      )
                    },
                    isChecked:
                      (labelClasses.isInLupa && !labelClasses.isRemoved) ||
                      labelClasses.isAdded
                  }
                },
                {
                  name: "Dropdown",
                  properties: {
                    options: R.map(language => {
                      return {
                        label:
                          _.find(language.metadata, m => {
                            return m.kieli === props.locale;
                          }).nimi || "[Kielen nimi tähän]",
                        value: language.value
                      };
                    }, props.kielet),
                    selectedOption: defaultLanguage
                  }
                }
              ]
            };
          })
        };
      }, koulutustyypit)
    );
  };

  return (
    <React.Fragment>
      {R.addIndex(R.map)((koulutusala, i) => {
        const areaCode = koulutusala.koodiarvo || koulutusala.koodiArvo;
        const article = getArticle(areaCode, props.lupa.kohteet[2].maaraykset);
        const title = parseLocalizedField(
          koulutusala.metadata,
          R.toUpper(props.locale)
        );
        return (
          <ExpandableRowRoot
            key={`expandable-row-root-${i}`}
            categories={getCategories(article, koulutusala.koulutukset)}
            changes={[]}
            code={areaCode}
            title={title}
          />
        );
      }, koulutusdata)}
    </React.Fragment>
  );
};

Tutkintokielet.defautlProps = {
  locale: "FI"
};

Tutkintokielet.propTypes = {
  koulutukset: PropTypes.object,
  koulutusalat: PropTypes.object,
  koulutustyypit: PropTypes.array,
  kielet: PropTypes.array,
  locale: PropTypes.string,
  lupa: PropTypes.object,
  onChanges: PropTypes.func
};

export default Tutkintokielet;
