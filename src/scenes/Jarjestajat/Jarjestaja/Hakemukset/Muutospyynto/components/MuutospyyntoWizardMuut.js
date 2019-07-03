import React, { useEffect, useState } from "react";
import Section from "../../../../../../components/03-templates/Section";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import ExpandableRowRoot from "../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import { isInLupa, isAdded, isRemoved } from "../../../../../../css/label";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import _ from "lodash";

const MuutospyyntoWizardMuut = React.memo(props => {
  const sectionId = "muut";
  const [muutdata, setMuutdata] = useState([]);
  const [changes, setChanges] = useState({});
  const [locale, setLocale] = useState([]);

  const { lupa, onUpdate } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[5];
  const { headingNumber } = kohde;
  const heading = props.intl.formatMessage(wizardMessages.header_section5);

  const divideArticles = articles => {
    const dividedArticles = {};
    R.forEach(article => {
      const { metadata } = article;
      const kasite = parseLocalizedField(metadata, "FI", "kasite");
      const kuvaus = parseLocalizedField(metadata, "FI", "kuvaus");

      if (kuvaus) {
        if (kasite) {
          if (!dividedArticles[kasite]) {
            dividedArticles[kasite] = [];
          }
          dividedArticles[kasite].push(article);
        }
      }
    }, articles);
    return dividedArticles;
  };

  useEffect(() => {
    const dividedArticles = divideArticles(props.muut.data);
    const expandableRows = [
      {
        key: "laajennettu",
        title: "Laajennettu oppisopimuskoulutuksen järjestämistehtävä",
        code: "01",
        data: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.laajennettu || []
          }
        ]
      },
      {
        key: "vaativat",
        title: "Vaativan erityisen tuen tehtävä",
        code: "02",
        isCollapsedByDefault: true,
        data: [
          {
            componentName: "RadioButtonWithLabel",
            title: props.intl.formatMessage(wizardMessages.chooseOnlyOne),
            articles: dividedArticles.vaativa_1 || []
          },
          {
            componentName: "CheckboxWithLabel",
            title: props.intl.formatMessage(wizardMessages.chooseAdditional),
            articles: dividedArticles.vaativa_2 || []
          }
        ]
      },
      {
        key: "sisaoppilaitos",
        title: "Sisäoppilaitosmuotoinen koulutus",
        code: "03",
        data: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.sisaoppilaitos || []
          }
        ]
      },
      {
        key: "vankila",
        title: "Vankilaopetus",
        code: "04",
        articles: dividedArticles.vankila,
        data: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.vankila || []
          }
        ]
      },
      {
        key: "urheilu",
        title: "Urheilijoiden ammatillinen koulutus",
        code: "05",
        data: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.urheilu || []
          }
        ]
      },
      {
        key: "yhteistyo",
        title: "Yhteistyö",
        code: "06",
        data: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.yhteistyo || []
          }
        ]
      },
      {
        key: "muumaarays",
        title: "Muu määräys",
        code: "07",
        data: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.muumaarays || []
          }
        ]
      }
    ];
    setMuutdata(expandableRows);
  }, [props.intl, props.muut.data]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    onUpdate({ sectionId, changes });
  }, [changes, onUpdate]);

  const getCategories = (row, locale) => {
    return R.map(item => {
      return {
        anchor: row.key,
        title: item.title,
        categories: R.map(article => {
          const title =
            _.find(article.metadata, m => {
              return m.kieli === locale;
            }).kuvaus || "[Koulutuksen otsikko tähän]";
          const labelClasses = {
            // isInLupa: article
            //   ? !!_.find(article.voimassaAlkuPvm, koulutusala => {
            //       return !!_.find(koulutusala.koulutukset, {
            //         koodi: koulutus.koodiArvo
            //       });
            //     })
            //   : false
          };
          return {
            anchor: article.koodiArvo,
            components: [
              {
                name: item.componentName,
                properties: {
                  name: item.componentName,
                  isChecked: item.shouldBeSelected,
                  title: title,
                  labelStyles: {
                    addition: isAdded,
                    removal: isRemoved,
                    custom: Object.assign(
                      {},
                      labelClasses.isInLupa ? isInLupa : {}
                    )
                  }
                }
              }
            ]
          };
        }, item.articles)
      };
    }, row.data);
  };

  const saveChanges = payload => {
    setChanges(prevState => {
      const newState = R.clone(prevState);
      newState[payload.anchor] = payload.changes;
      return newState;
    });
  };

  const removeChanges = (...payload) => {
    return onUpdate({ index: payload[2], changes: [] });
  };

  return (
    <Section code={headingNumber} title={heading}>
      {R.addIndex(R.map)((row, i) => {
        const categories = getCategories(row, locale);
        return (
          <ExpandableRowRoot
            anchor={row.code}
            key={`expandable-row-root-${i}`}
            categories={categories}
            changes={changes[row.code] || []}
            code={row.code}
            index={i}
            onUpdate={saveChanges}
            sectionId={sectionId}
            title={row.title}
            isExpanded={!row.isCollapsedByDefault}
            onChangesRemove={removeChanges}
          />
        );
      }, muutdata)}
    </Section>
  );
});

MuutospyyntoWizardMuut.propTypes = {
  onUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardMuut);
