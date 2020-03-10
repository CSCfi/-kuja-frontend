import React, { useMemo } from "react";
import ExpandableRowRoot from "okm-frontend-components/dist/components/02-organisms/ExpandableRowRoot";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import common from "../../../../../../i18n/definitions/common";
import Lomake from "../../../../../../components/02-organisms/Lomake";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import { useChangeObjects } from "../../../../../../stores/changeObjects";

const MuutospyyntoWizardMuut = props => {
  const [changeObjects] = useChangeObjects();
  const intl = useIntl();
  const sectionId = "muut";
  const { onChangesRemove, onChangesUpdate } = props;

  const osiota5koskevatMaaraykset = useMemo(() => {
    return R.filter(
      R.propEq("koodisto", "oivamuutoikeudetvelvollisuudetehdotjatehtavat")
    )(props.maaraykset);
  }, [props.maaraykset]);

  const divideArticles = useMemo(() => {
    return () => {
      const group = {};
      R.forEach(article => {
        const { metadata } = article;
        const kasite = parseLocalizedField(metadata, "FI", "kasite");
        const kuvaus = parseLocalizedField(metadata, "FI", "kuvaus");
        const isInLupa = !!R.find(R.propEq("koodiarvo", article.koodiArvo))(
          osiota5koskevatMaaraykset
        );
        if (
          (kuvaus || article.koodiArvo === "22") &&
          kasite &&
          (isInLupa || article.koodiArvo !== "15")
        ) {
          group[kasite] = group[kasite] || [];
          group[kasite].push(article);
        }
      }, props.muut);
      return group;
    };
  }, [osiota5koskevatMaaraykset, props.muut]);

  const config = useMemo(() => {
    const dividedArticles = divideArticles();
    return [
      {
        code: "01",
        key: "laajennettu",
        isInUse: !!dividedArticles["laajennettu"].length,
        title: "Laajennettu oppisopimuskoulutuksen järjestämistehtävä",
        categoryData: [
          {
            articles: dividedArticles.laajennettu || [],
            componentName: "CheckboxWithLabel",
            title: ""
          }
        ]
      },
      {
        code: "02",
        key: "vaativatuki",
        isInUse:
          !!dividedArticles["vaativa_1"].length ||
          !!dividedArticles["vaativa_2"].length,
        title: "Vaativan erityisen tuen tehtävä",
        categoryData: [
          {
            articles: dividedArticles.vaativa_1 || [],
            componentName: "RadioButtonWithLabel",
            title: intl.formatMessage(wizardMessages.chooseOnlyOne)
          },
          {
            articles: dividedArticles.vaativa_2 || [],
            componentName: "CheckboxWithLabel",
            title: intl.formatMessage(wizardMessages.chooseAdditional)
          }
        ]
      },
      {
        code: "03",
        key: "sisaoppilaitos",
        isInUse: !!dividedArticles["sisaoppilaitos"].length,
        title: "Sisäoppilaitosmuotoinen koulutus",
        categoryData: [
          {
            articles: dividedArticles.sisaoppilaitos || [],
            componentName: "CheckboxWithLabel",
            title: ""
          }
        ]
      },
      {
        code: "04",
        key: "vankila",
        isInUse: !!dividedArticles["vankila"].length,
        title: "Vankilaopetus",
        categoryData: [
          {
            articles: dividedArticles.vankila || [],
            componentName: "CheckboxWithLabel",
            title: ""
          }
        ]
      },
      {
        code: "05",
        key: "urheilu",
        isInUse: !!dividedArticles["urheilu"].length,
        title: "Urheilijoiden ammatillinen koulutus",
        categoryData: [
          {
            articles: dividedArticles.urheilu || [],
            componentName: "CheckboxWithLabel",
            title: ""
          }
        ]
      },
      {
        code: "06",
        key: "yhteistyo",
        isInUse: !!dividedArticles["yhteistyo"].length,
        title: "Yhteistyö",
        categoryData: [
          {
            componentName: "CheckboxWithLabel",
            title: "",
            articles: dividedArticles.yhteistyo || []
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
            componentName: "CheckboxWithLabel",
            title: ""
          }
        ]
      }
    ];
  }, [divideArticles, intl]);

  return (
    <React.Fragment>
      {R.addIndex(R.map)((configObj, i) => {
        return (
          <ExpandableRowRoot
            anchor={`${sectionId}_${configObj.code}`}
            key={`expandable-row-root-${i}`}
            categories={[]}
            changes={R.prop(configObj.code, changeObjects.muut)}
            hideAmountOfChanges={true}
            messages={{ undo: intl.formatMessage(common.undo) }}
            code={configObj.code}
            index={i}
            onUpdate={onChangesUpdate}
            sectionId={sectionId}
            showCategoryTitles={true}
            title={configObj.title}
            onChangesRemove={onChangesRemove}>
            <Lomake
              action="modification"
              anchor={`${sectionId}_${configObj.code}`}
              changeObjects={R.prop(configObj.code, changeObjects.muut)}
              data={{
                configObj,
                osiota5koskevatMaaraykset
              }}
              onChangesUpdate={onChangesUpdate}
              path={["muut"]}
              rules={[]}
              showCategoryTitles={true}></Lomake>
          </ExpandableRowRoot>
        );
      }, R.filter(R.propEq("isInUse", true))(config))}
    </React.Fragment>
  );
};

MuutospyyntoWizardMuut.propTypes = {
  headingNumber: PropTypes.number,
  maaraykset: PropTypes.array,
  muut: PropTypes.array,
  onChangesRemove: PropTypes.func,
  onChangesUpdate: PropTypes.func
};

export default MuutospyyntoWizardMuut;
