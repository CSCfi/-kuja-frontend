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
  const [locale, setLocale] = useState("FI");

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
    const codes = ["01", "02", "03", "04", "05", "06", "07"];
    const datas = [
      [
        {
          componentName: "CheckboxWithLabel",
          title: "",
          articles: dividedArticles.laajennettu || []
        }
      ],
      [
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
      ],
      [
        {
          componentName: "CheckboxWithLabel",
          title: "",
          articles: dividedArticles.sisaoppilaitos || []
        }
      ],
      [
        {
          componentName: "CheckboxWithLabel",
          title: "",
          articles: dividedArticles.vankila || []
        }
      ],
      [
        {
          componentName: "CheckboxWithLabel",
          title: "",
          articles: dividedArticles.urheilu || []
        }
      ],
      [
        {
          componentName: "CheckboxWithLabel",
          title: "",
          articles: dividedArticles.yhteistyo || []
        }
      ],
      [
        {
          componentName: "CheckboxWithLabel",
          title: "",
          articles: dividedArticles.muumaarays || []
        }
      ]
    ];
    const keys = [
      "laajennettu",
      "vaativat",
      "sisaoppilaitos",
      "vankila",
      "urheilu",
      "yhteistyo",
      "muumaarays"
    ];
    const titles = [
      "Laajennettu oppisopimuskoulutuksen järjestämistehtävä",
      "Vaativan erityisen tuen tehtävä",
      "Sisäoppilaitosmuotoinen koulutus",
      "Vankilaopetus",
      "Urheilijoiden ammatillinen koulutus",
      "Yhteistyö",
      "Muu määräys"
    ];
    const expandableRows = !!locale.length ? R.addIndex(R.map)((code, i) => {
      return {
        code,
        key: keys[i],
        title: titles[i],
        categories: getCategories(
          {
            key: keys[i],
            data: datas[i]
          },
          locale
        ),
        data: datas[i]
      };
    }, codes) : [];

    setMuutdata(expandableRows);
  }, [locale, props.intl, props.muut.data]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  useEffect(() => {
    onUpdate({
      sectionId,
      state: {
        kohde,
        changes,
        muutdata
      }
    });
  }, [changes, kohde, muutdata, onUpdate]);

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
          // const isInLupaBool = article
          //   ? !!_.find(article.voimassaAlkuPvm, koulutusala => {
          //       return !!_.find(koulutusala.koulutukset, {
          //         koodi: koulutus.koodiArvo
          //       });
          //     })
          //   : false
          const isInLupaBool = true;
          const labelClasses = {
            isInLupa: isInLupaBool
          };
          return {
            anchor: article.koodiArvo,
            meta: {
              isInLupa: isInLupaBool
            },
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
    return saveChanges({ anchor: payload[1], changes: [] });
  };

  return (
    <Section code={headingNumber} title={heading}>
      {R.addIndex(R.map)((row, i) => {
        return (
          <ExpandableRowRoot
            anchor={row.code}
            key={`expandable-row-root-${i}`}
            categories={row.categories}
            changes={changes[row.code]}
            code={row.code}
            index={i}
            onUpdate={saveChanges}
            sectionId={sectionId}
            title={row.title}
            onChangesRemove={removeChanges}
          />
        );
      }, muutdata)}
    </Section>
  );
});

MuutospyyntoWizardMuut.propTypes = {
  muut: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardMuut);
