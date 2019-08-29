import React, { useEffect, useState } from "react";
import Section from "../../../../../../../components/03-templates/Section";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import _ from "lodash";

const PerustelutMuut = React.memo(props => {
  const sectionId = "muut";
  const [muutdata, setMuutdata] = useState([]);
  const [changes, setChanges] = useState({});
  const [locale, setLocale] = useState("FI");
  const { onUpdate } = props;
  const heading = props.intl.formatMessage(wizardMessages.header_section5);

  useEffect(() => {
    const divideArticles = (articles, relevantCodes) => {
      const dividedArticles = {};
      const relevantMaaraykset = R.filter(
        R.propEq("koodisto", "oivamuutoikeudetvelvollisuudetehdotjatehtavat")
      )(props.maaraykset);
      R.forEach(article => {
        const { metadata } = article;
        const kasite = parseLocalizedField(metadata, "FI", "kasite");
        const kuvaus = parseLocalizedField(metadata, "FI", "kuvaus");
        const isInRelevantMaaraykset = !!R.find(
          R.propEq("koodiarvo", article.koodiArvo)
        )(relevantMaaraykset);
        if (
          kuvaus &&
          kasite &&
          R.includes(article.koodiArvo, relevantCodes) &&
          (isInRelevantMaaraykset ||
            (article.koodiArvo !== "15" && article.koodiArvo !== "22"))
        ) {
          dividedArticles[kasite] = dividedArticles[kasite] || [];
          dividedArticles[kasite].push(article);
        }
      }, articles);
      return dividedArticles;
    };

    const getCategories = (configObj, locale) => {
      return R.map(item => {
        return {
          anchor: configObj.key,
          title: item.title,
          categories: R.map(article => {
            const title =
              _.find(article.metadata, m => {
                return m.kieli === locale;
              }).kuvaus || "[Koulutuksen otsikko tähän]";
            const isInLupaBool = article
              ? !!_.find(article.voimassaAlkuPvm, koulutusala => {
                  return article.koodiArvo === koulutusala;
                })
              : false;
            const labelClasses = {
              isInLupa: isInLupaBool
            };
            let structure = {
              anchor: article.koodiArvo,
              meta: {
                isInLupa: isInLupaBool,
                koodiarvo: article.koodiArvo,
                koodisto: article.koodisto
              },
              components: [
                {
                  anchor: "A",
                  name: item.componentName,
                  properties: {
                    name: item.componentName,
                    isChecked: isInLupaBool,
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
            structure.categories = [
              {
                anchor: "perustelut",
                title: "Perustelut",
                components: [
                  {
                    anchor: "A",
                    name: "TextBox",
                    properties: {
                      defaultValue: "Text 2"
                    }
                  }
                ]
              }
            ];
            return structure;
          }, item.articles)
        };
      }, configObj.categoryData);
    };

    const relevantCodes = R.map(
      R.compose(
        R.view(R.lensIndex(2)),
        R.split(".")
      )
    )(
      R.map(
        R.prop("anchor"),
        R.compose(
          R.flatten,
          R.values
        )(props.backendChanges)
      )
    );
    const dividedArticles = divideArticles(props.muut.data, relevantCodes);

    const config = [
      {
        code: "01",
        key: "laajennettu",
        isInUse: !!dividedArticles["laajennettu"] && props.backendChanges["01"],
        title: "Laajennettu oppisopimuskoulutuksen järjestämistehtävä",
        categoryData: [
          {
            articles: dividedArticles.laajennettu || [],
            componentName: "StatusTextRow"
          }
        ]
      },
      {
        code: "02",
        key: "vaativatuki",
        isInUse:
          !!dividedArticles["vaativa_1"] ||
          !!dividedArticles["vaativa_2"] ||
          props.backendChanges["02"],
        title: "Vaativan erityisen tuen tehtävä",
        categoryData: [
          {
            articles: dividedArticles.vaativa_1 || [],
            componentName: "StatusTextRow"
          },
          {
            articles: dividedArticles.vaativa_2 || [],
            componentName: "StatusTextRow"
          }
        ]
      },
      {
        code: "03",
        key: "sisaoppilaitos",
        isInUse: !!dividedArticles["sisaoppilaitos"],
        title: "Sisäoppilaitosmuotoinen koulutus",
        categoryData: [
          {
            articles: dividedArticles.sisaoppilaitos || [],
            componentName: "StatusTextRow"
          }
        ]
      },
      {
        code: "04",
        key: "vankila",
        isInUse: !!dividedArticles["vankila"],
        title: "Vankilaopetus",
        categoryData: [
          {
            articles: dividedArticles.vankila || [],
            componentName: "StatusTextRow"
          }
        ]
      },
      {
        code: "05",
        key: "urheilu",
        isInUse: !!dividedArticles["urheilu"],
        title: "Urheilijoiden ammatillinen koulutus",
        categoryData: [
          {
            articles: dividedArticles.urheilu || [],
            componentName: "StatusTextRow"
          }
        ]
      },
      {
        code: "06",
        key: "yhteistyo",
        isInUse: !!dividedArticles["yhteistyo"],
        title: "Yhteistyö",
        categoryData: [
          {
            articles: dividedArticles.yhteistyo || [],
            componentName: "StatusTextRow",
          }
        ]
      },
      {
        code: "07",
        key: "muumaarays",
        isInUse: !!dividedArticles["muumaarays"],
        title: "Muu määräys",
        categoryData: [
          {
            articles: dividedArticles.muumaarays || [],
            componentName: "StatusTextRow"
          }
        ]
      }
    ];

    const expandableRows = !!locale.length
      ? R.addIndex(R.map)((configObj, i) => {
          return {
            code: configObj.code,
            key: configObj.key,
            title: configObj.title,
            categories: getCategories(configObj, locale, props.kohde),
            data: configObj.categoryData
          };
        }, R.filter(R.propEq("isInUse", true))(config))
      : [];

    setMuutdata(expandableRows);
  }, [
    props.kohde,
    locale,
    props.intl,
    props.maaraykset,
    props.muut.data,
    props.backendChanges
  ]);

  useEffect(() => {
    setLocale(R.toUpper(props.intl.locale));
  }, [props.intl.locale]);

  const saveChanges = payload => {
    setChanges(prevState => {
      const newState = _.cloneDeep(prevState);
      newState[payload.anchor] = payload.changes;
      return newState;
    });
  };

  const removeChanges = (...payload) => {
    return saveChanges({ anchor: payload[1], changes: [] });
  };

  useEffect(() => {
    setChanges(props.backendChanges);
  }, [props.backendChanges]);

  useEffect(() => {
    onUpdate({
      sectionId,
      changes,
      kohde: props.kohde,
      muutdata
    });
  }, [changes, muutdata, props.kohde, onUpdate]);

  return (
    <React.Fragment>
      <Section code={props.headingNumber} title={heading}>
        {R.addIndex(R.map)((row, i) => {
          return (
            <ExpandableRowRoot
              anchor={row.code}
              key={`expandable-row-root-${i}`}
              categories={row.categories}
              changes={changes[row.code]}
              code={row.code}
              disableReverting={true}
              hideAmountOfChanges={false}
              index={i}
              isExpanded={true}
              onUpdate={saveChanges}
              sectionId={sectionId}
              title={row.title}
              onChangesRemove={removeChanges}
            />
          );
        }, muutdata)}
      </Section>
    </React.Fragment>
  );
});

PerustelutMuut.propTypes = {
  backendChanges: PropTypes.object,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  maaraykset: PropTypes.array,
  muut: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(PerustelutMuut);
