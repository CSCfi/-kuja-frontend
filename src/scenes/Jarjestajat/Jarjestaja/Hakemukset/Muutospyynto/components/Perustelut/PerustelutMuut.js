import React, { useEffect, useState } from "react";
import FormSection from "../../../../../../../components/03-templates/FormSection";
import { injectIntl } from "react-intl";
import * as R from "ramda";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { isInLupa, isAdded, isRemoved } from "../../../../../../../css/label";
import PropTypes from "prop-types";
import _ from "lodash";

const defaultProps = {
  backendChanges: [],
  headingNumber: 0,
  kohde: {},
  maaraykset: [],
  muut: {},
  title: "No title set"
};

const PerustelutMuut = React.memo(
  ({
    backendChanges = defaultProps.backendChanges,
    handleChanges,
    headingNumber = defaultProps.headingNumber,
    intl,
    kohde = PropTypes.kohde,
    maaraykset = defaultProps.maaraykset,
    muut = defaultProps.muut,
    title = defaultProps.title
  }) => {
    const sectionId = "perustelutmuut";
    const [muutdata, setMuutdata] = useState([]);
    const [changes, setChanges] = useState({});
    const [locale, setLocale] = useState("FI");

    useEffect(() => {
      const divideArticles = (articles, relevantCodes) => {
        const dividedArticles = {};
        const relevantMaaraykset = R.filter(
          R.propEq("koodisto", "oivamuutoikeudetvelvollisuudetehdotjatehtavat")
        )(maaraykset);
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
          )(backendChanges)
        )
      );
      const dividedArticles = divideArticles(muut.data, relevantCodes);

      const config = [
        {
          code: "01",
          key: "laajennettu",
          isInUse: !!dividedArticles["laajennettu"] && backendChanges["01"],
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
            backendChanges["02"],
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
              componentName: "StatusTextRow"
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
              categories: getCategories(configObj, locale, kohde),
              data: configObj.categoryData
            };
          }, R.filter(R.propEq("isInUse", true))(config))
        : [];

      setMuutdata(expandableRows);
    }, [kohde, locale, intl, maaraykset, muut.data, backendChanges]);

    useEffect(() => {
      setLocale(R.toUpper(intl.locale));
    }, [intl.locale]);

    useEffect(() => {
      setChanges(backendChanges);
    }, [backendChanges]);

    return (
      <React.Fragment>
        {R.compose(
          R.not,
          R.isEmpty
        )(changes) ? (
          <FormSection
            id={sectionId}
            sectionChanges={changes}
            code={headingNumber}
            title={title}
            runOnChanges={handleChanges}
            render={props => (
              <React.Fragment>
                {R.addIndex(R.map)((row, i) => {
                  return (
                    <ExpandableRowRoot
                      anchor={row.code}
                      key={`expandable-row-root-${i}`}
                      categories={row.categories}
                      changes={props.sectionChanges[row.code]}
                      code={row.code}
                      disableReverting={true}
                      hideAmountOfChanges={false}
                      showCategoryTitles={true}
                      index={i}
                      isExpanded={true}
                      sectionId={sectionId}
                      title={row.title}
                      {...props}
                    />
                  );
                })(muutdata)}
              </React.Fragment>
            )}
          />
        ) : null}
      </React.Fragment>
    );
  }
);

PerustelutMuut.propTypes = {
  backendChanges: PropTypes.object,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  maaraykset: PropTypes.array,
  muut: PropTypes.object,
  title: PropTypes.string
};

export default injectIntl(PerustelutMuut);
