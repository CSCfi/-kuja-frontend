import React, { useEffect, useState } from "react";
import Section from '../../../../../../components/03-templates/Section'
import _ from "lodash";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import ExpandableRowRoot from "../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import { isInLupa, isAdded, isRemoved } from "../../../../../../css/label";
import wizardMessages from "../../../../../../i18n/definitions/wizard";

const MuutospyyntoWizardMuut = React.memo(props => {

  const sectionId = "muut";
  const [muutdata, setMuutdata] = useState([]);
  const [changes, setChanges] = useState({});
  const [locale, setLocale] = useState([]);
  const { lupa, muut, muutmuutoksetValue } = props;
  const { kohteet } = lupa;
  const kohde = kohteet[5];
  const { headingNumber, heading } = kohde;

  const divideArticles = articles => {
    const dividedArticles = {};
    R.map(article => {
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
    const expandableRows = [{
      key: "laajennettu",
      title: "Laajennettu oppisopimuskoulutuksen järjestämistehtävä",
      code: "01",
      data: [{
        componentName: "CheckboxWithLabel",
        title: "",
        articles: dividedArticles.laajennettu || []
      }]
    },
    {
      key: "vaativat",
      title: "Vaativan erityisen tuen tehtävä",
      code: "02",
      isCollapsedByDefault: true,
      data: [{
        componentName: "RadioButtonWithLabel",
        title: props.intl.formatMessage(wizardMessages.chooseOnlyOne),
        articles: dividedArticles.vaativa_1 || []
      }, {
        componentName: "CheckboxWithLabel",
        title: props.intl.formatMessage(wizardMessages.chooseAdditional),
        articles: dividedArticles.vaativa_2 || []
      }]
    },
    {
      key: "sisaoppilaitos",
      title: "Sisäoppilaitosmuotoinen koulutus",
      code: "03",
      data: [{
        componentName: "CheckboxWithLabel",
        title: "",
        articles: dividedArticles.sisaoppilaitos || []
      }]
    },
    {
      key: "vankila",
      title: "Vankilaopetus",
      code: "04",
      articles: dividedArticles.vankila,
      data: [{
        componentName: "CheckboxWithLabel",
        title: "",
        articles: dividedArticles.vankila || []
      }]
    },
    {
      key: "urheilu",
      title: "Urheilijoiden ammatillinen koulutus",
      code: "05",
      data: [{
        componentName: "CheckboxWithLabel",
        title: "",
        articles: dividedArticles.urheilu || []
      }]
    },
    {
      key: "yhteistyo",
      title: "Yhteistyö",
      code: "06",
      data: [{
        componentName: "CheckboxWithLabel",
        title: "",
        articles: dividedArticles.yhteistyo || []
      }]
    },
    {
      key: "muumaarays",
      title: "Muu määräys",
      code: "07",
      data: [{
        componentName: "CheckboxWithLabel",
        title: "",
        articles: dividedArticles.muumaarays || []
      }]
    }
  ];
  setMuutdata(expandableRows);
  }, [props.muut.data]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  const getCategories = (data, locale) => {
    return R.map(item => {
      return {
        title: item.title,
        categories: R.map(article => {
          const title =
            _.find(article.metadata, m => {
            return m.kieli === locale;
          }).kuvaus || "[Koulutuksen otsikko tähän]"
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
            components: [{
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
            }]
          }
        }, item.articles)
      };
    }, data);
  }

  const onUpdate = (payload) => {
    setChanges(prevState => {
      const newState = R.clone(prevState);
      newState[payload.index] = payload.changes;
      return newState
    });
  }

  const removeChanges = (...payload) => {
    return onUpdate({ index: payload[2], changes: [] });
  };

  return (
    <Section
      code={headingNumber}
      title={heading}
    >
      {R.addIndex(R.map)((row,i) => {
        const categories = getCategories(row.data, locale);
        return (
          <ExpandableRowRoot
            key={`expandable-row-root-${i}`}
            categories={categories}
            changes={changes[i] || []}
            code={"0"+i}
            index={i}
            onUpdate={onUpdate}
            sectionId={sectionId}
            title={ row.title }
            isExpanded={!row.isCollapsedByDefault}
            onChangesRemove={removeChanges}
          />
        )
      }, muutdata)
    }
    </Section>
  );
});

export default injectIntl(MuutospyyntoWizardMuut);
