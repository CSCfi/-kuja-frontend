import React, { useEffect, useState } from "react";
import ExpandableRowRoot from "../../../../../../../components/02-organisms/ExpandableRowRoot";
import FormSection from "../../../../../../../components/03-templates/FormSection";
// import wizardMessages from "../../../../../../../i18n/definitions/wizard";
import { isAdded, isRemoved } from "../../../../../../../css/label";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
// import { parseLocalizedField } from "../../../../../../../modules/helpers";

const defaultProps = {
  changes: [],
  kohde: {},
  lupa: {}
};

const PerustelutToimintaalue = React.memo(
  ({
    changes = defaultProps.changes,
    handleChanges,
    headingNumber,
    intl,
    kohde = defaultProps.kohde,
    lupa = defaultProps.lupa,
    title
  }) => {
    const sectionId = "perusteluttoimintaalue";
    const [categories, setCategories] = useState([]);
    const [groupedChanges, setGroupedChanges] = useState({});

    useEffect(() => {
      const getCategories = muutokset => {
        return {
          additions: R.map(muutos => {
            return {
              anchor: muutos.koodiarvo,
              components: [
                {
                  anchor: "label",
                  name: "StatusTextRow",
                  properties: {
                    labelStyles: Object.assign({}, { custom: isAdded }),
                    title: R.find(
                      R.propEq("kieli", R.toUpper(intl.locale)),
                      muutos.koodi.metadata
                    ).nimi
                  }
                }
              ],
              categories: [
                {
                  anchor: "tekstikentta",
                  components: [
                    {
                      anchor: "A",
                      name: "TextBox",
                      properties: {
                        placeholder: "Sana on vapaa..."
                      }
                    }
                  ]
                }
              ]
            };
          }, muutokset.LISAYS),
          removals: R.map(muutos => {
            return {
              anchor: muutos.koodiarvo,
              components: [
                {
                  anchor: "label",
                  name: "StatusTextRow",
                  properties: {
                    labelStyles: Object.assign({}, { custom: isRemoved }),
                    title: R.find(
                      R.propEq("kieli", R.toUpper(intl.locale)),
                      muutos.koodi.metadata
                    ).nimi
                  }
                }
              ],
              categories: [
                {
                  anchor: "tekstikentta",
                  components: [
                    {
                      anchor: "A",
                      name: "TextBox",
                      properties: {
                        placeholder: "Sana on vapaa..."
                      }
                    }
                  ]
                }
              ]
            };
          }, muutokset.POISTO)
        };
      };

      const valtakunnallinenChange = !!R.find(
        R.compose(
          R.equals("valtakunnallinen"),
          R.path(["properties", "name"])
        )
      )(changes);

      if (!valtakunnallinenChange) {
        // Let's form the change objects
        const groupedMuutokset = R.groupBy(R.prop("tila"), changes);
        const additions = R.map(muutos => {
          return {
            anchor: `additions.${muutos.koodiarvo}.label`,
            properties: {
              a: 1
            }
          };
        }, groupedMuutokset.LISAYS);
        const removals = R.map(muutos => {
          return {
            anchor: `removals.${muutos.koodiarvo}.label`,
            properties: {
              b: 1
            }
          };
        }, groupedMuutokset.POISTO);
        setGroupedChanges({ additions, removals });

        // Let's create the categories
        setCategories(getCategories(groupedMuutokset));
      }
    }, [changes, intl]);

    return (
      <React.Fragment>
        {R.compose(
          R.not,
          R.isEmpty
        )(groupedChanges) ? (
          <FormSection
            id={sectionId}
            sectionChanges={groupedChanges}
            code={headingNumber}
            title={title}
            runOnChanges={handleChanges}
            render={props => (
              <React.Fragment>
                <ExpandableRowRoot
                  anchor="additions"
                  key={`perustelut-toimintaalue-lisatyt`}
                  categories={categories.additions}
                  changes={props.sectionChanges.additions}
                  disableReverting={true}
                  hideAmountOfChanges={false}
                  showCategoryTitles={true}
                  isExpanded={true}
                  sectionId={sectionId}
                  title="Lisätyt"
                  {...props}
                />
                <ExpandableRowRoot
                  anchor="removals"
                  key={`perustelut-toimintaalue-poistetut`}
                  categories={categories.removals}
                  changes={props.sectionChanges.removals}
                  disableReverting={true}
                  hideAmountOfChanges={false}
                  showCategoryTitles={true}
                  isExpanded={true}
                  sectionId={sectionId}
                  title="Poistetut"
                  {...props}
                />
              </React.Fragment>
            )}
          />
        ) : null}
      </React.Fragment>
    );
  }
);

PerustelutToimintaalue.propTypes = {
  changes: PropTypes.array,
  handleChanges: PropTypes.func,
  headingNumber: PropTypes.number,
  kohde: PropTypes.object,
  lupa: PropTypes.object
};

export default injectIntl(PerustelutToimintaalue);
