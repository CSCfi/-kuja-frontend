import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import validate from "../modules/validateWizard";
import {
  TUTKINTO_TEKSTIT,
  TUTKINNOT_SECTIONS
} from "../../../modules/constants";
import TutkintoList from "./TutkintoList";
import KoulutusList from "./KoulutusList";
import { parseLocalizedField } from "../../../../../../modules/helpers";
import Loading from "../../../../../../modules/Loading";
import { Row, Info } from "./MuutospyyntoWizardComponents";
import {
  FIELD_ARRAY_NAMES,
  FORM_NAME_UUSI_HAKEMUS
} from "../modules/uusiHakemusFormConstants";
import Section from "components/Section";
import { MUUTOS_TYPES } from "../modules/uusiHakemusFormConstants";
import {
  addItemToChanges,
  addSubItemToChanges,
  removeItemFromChanges,
  removeSubItemFromChanges
} from "utils/changes";

class MuutospyyntoWizardTutkinnot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changes: null
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  getChangesByList = (allChanges, koulutusdata) => {
    const changes = {};
    _.forEach(koulutusdata, koulutusala => {
      const koulutustyypit = koulutusala.koulutukset;
      changes[koulutusala.koodiArvo] = _.map(allChanges, change => {
        return !!_.find(koulutustyypit, koulutustyyppi => {
          return !!_.find(koulutustyyppi.koulutukset, koulutus => {
            return (
              koulutus.koodiArvo === change.koodiarvo ||
              koulutus.koodiArvo === change.koodiArvo
            );
          });
        })
          ? change
          : null;
      }).filter(Boolean);
    });
    return changes;
  };

  handleChanges = (item, isSubItemTarget, listId) => {
    if (isSubItemTarget) {
      /**
       * If user has clicked a sub item
       **/
      const existingChange = _.find(this.state.changes[listId], {
        koodiArvo: item.subItems[0].code
      });
      if (existingChange) {
        this.setState(state =>
          removeSubItemFromChanges(item.subItems[0], state.changes, listId)
        );
      } else {
        // Let's find out the type of operation
        const operationType = item.subItems[0].shouldBeSelected
          ? MUUTOS_TYPES.REMOVAL
          : MUUTOS_TYPES.ADDITION;
        // If user is going to select the sub item we wanted its parent to be selected too
        if (operationType === MUUTOS_TYPES.ADDITION) {
          // Let's find out if the parent item is already selected
          const isItemSelected = !!_.find(this.state.changes[listId], {
            koodiarvo: item.code
          });
          // Parent item needs to be selected when at least one sub item is going to be selected
          if (!isItemSelected) {
            this.setState(state =>
              addItemToChanges(item, state.changes, listId, operationType)
            );
          }
        }
        // Let's add the sub item to changes
        this.setState(state =>
          addSubItemToChanges(
            item.subItems[0],
            state.changes,
            listId,
            operationType
          )
        );
      }
    } else {
      /**
       * If user has clicked an item
       **/
      // Let's find out the type of operation
      const operationType = item.shouldBeSelected
        ? MUUTOS_TYPES.REMOVAL
        : MUUTOS_TYPES.ADDITION;
      const existingChange = _.find(this.state.changes[listId], {
        koodiarvo: item.code
      });
      if (operationType === MUUTOS_TYPES.REMOVAL) {
        // If user is going to unselect the item we need to unselect all the sub items too
        let changes = { ...this.state.changes };
        _.forEach(item.subItems, subItem => {
          changes = removeSubItemFromChanges(subItem, changes, listId);
        });
        this.setState(changes);
      }
      // Let's reset the item's state
      if (existingChange) {
        this.setState(state =>
          removeItemFromChanges(item, state.changes, listId)
        );
      } else {
        this.setState(state =>
          addItemToChanges(item, state.changes, listId, operationType)
        );
      }
    }
  };

  render() {
    const { lupa } = this.props;
    const { kohteet } = lupa;
    const { headingNumber, heading } = kohteet[1];
    const koulutusdata = this.props.koulutukset.koulutusdata;
    const koulutuksetFetched = this.props.koulutukset.fetched;
    const koulutuksetIsFetching = this.props.koulutukset.isFetching;
    const koulutuksetHasErrored = this.props.koulutukset.hasErrored;

    let muutFetched = undefined;
    let muutIsFetching = undefined;
    let muutHasErrored = undefined;
    let muuData = undefined;
    let poikkeusData = undefined;

    const { muut, poikkeukset } = this.props.koulutukset;

    if (muut) {
      muutFetched = muut.fetched;
      muutIsFetching = muut.isFetching;
      muutHasErrored = muut.hasErrored;
      muuData = muut.muudata;
    }

    if (poikkeukset) {
      poikkeusData = poikkeukset.data;
    }

    const koulutusDataSorted = _.sortBy(koulutusdata, d => {
      return d.koodiArvo;
    });

    if (
      koulutuksetFetched &&
      muutFetched &&
      muuData !== undefined &&
      poikkeusData !== undefined
    ) {
      return (
        <Section code={headingNumber} title={heading}>
          <Row>
            {_.map(koulutusDataSorted, (koulutusala, i) => {
              const koodiarvo = koulutusala.koodiarvo || koulutusala.koodiArvo;
              const { metadata, koulutukset } = koulutusala;
              const nimi = parseLocalizedField(metadata);
              return (
                  <TutkintoList
                    key={i}
                    koodiarvo={koodiarvo}
                    areaCode={koodiarvo}
                    nimi={nimi}
                    koulutustyypit={koulutukset}
                    articles={kohteet[1].maaraykset}
                    changes={this.state.changes ? this.state.changes[koodiarvo] : []}
                    onChanges={this.handleChanges}
                    listId={koodiarvo}
                  />
              );
            })}
          </Row>

          {/* <Row>
            <FieldArray
              name={FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET}
              kohde={kohteet[1]}
              poikkeukset={poikkeusData}
              lupa={lupa}
              muut={muuData}
              editValue={tutkintomuutoksetValue}
              component={this.renderKoulutukset}
            />
          </Row> */}
        </Section>
      );
    } else if (koulutuksetIsFetching || muutIsFetching) {
      return <Loading />;
    } else if (koulutuksetHasErrored || muutHasErrored) {
      return <h2>Virhe ladattaessa tietoja</h2>;
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.koulutukset &&
      this.props.koulutukset.koulutusdata &&
      this.props.tutkintomuutoksetValue
    ) {
      const changes = this.getChangesByList(
        this.props.tutkintomuutoksetValue,
        this.props.koulutukset.koulutusdata
      );
      if (this.state.changes === null) {
        this.setState({
          changes: changes || []
        });
      }
    }
  }

  renderTutkinnot(props) {
    let { fields, data } = props;
    const { kohde, editValue } = props;
    const { maaraykset } = kohde;

    data = _.sortBy(data, d => {
      return d.koodiArvo;
    });

    return (
      <Row>
        {_.map(data, (koulutusala, i) => {
          const koodiarvo = koulutusala.koodiarvo || koulutusala.koodiArvo;
          const { metadata, koulutukset } = koulutusala;
          const nimi = parseLocalizedField(metadata);
          return (
            <TutkintoList
              key={i}
              koodiarvo={koodiarvo}
              areaCode={koodiarvo}
              nimi={nimi}
              koulutustyypit={koulutukset}
              articles={maaraykset}
              changes={editValue}
              fields={fields}
            />
          );
        })}
      </Row>
    );
  }

  renderKoulutukset(props) {
    const { kohde, muut, poikkeukset, editValue, fields } = props;
    const { muutMaaraykset } = kohde;

    return (
      <Row>
        <Info>{TUTKINTO_TEKSTIT.otsikkoTaydentava.FI}</Info>

        <KoulutusList
          key="valmentavat"
          koodisto="koulutus"
          nimi={TUTKINNOT_SECTIONS.POIKKEUKSET}
          koulutukset={poikkeukset}
          muutMaaraykset={muutMaaraykset}
          editValues={editValue}
          fields={fields}
        />

        {muut.ammatilliseentehtavaanvalmistavakoulutus && (
          <KoulutusList
            key="ammatilliseentehtavaanvalmistavakoulutus"
            koodisto="ammatilliseentehtavaanvalmistavakoulutus"
            nimi={TUTKINNOT_SECTIONS.VALMISTAVAT}
            koulutukset={muut.ammatilliseentehtavaanvalmistavakoulutus}
            muutMaaraykset={muutMaaraykset}
            editValues={editValue}
            fields={fields}
          />
        )}

        {muut.oivatyovoimakoulutus && (
          <KoulutusList
            key="oivatyovoimakoulutus"
            koodisto="oivatyovoimakoulutus"
            nimi={TUTKINNOT_SECTIONS.TYOVOIMAT}
            koulutukset={muut.oivatyovoimakoulutus}
            muutMaaraykset={muutMaaraykset}
            editValues={editValue}
            fields={fields}
          />
        )}

        {muut.kuljettajakoulutus && (
          <KoulutusList
            key="kuljettajakoulutus"
            koodisto="kuljettajakoulutus"
            nimi={TUTKINNOT_SECTIONS.KULJETTAJAT}
            koulutukset={muut.kuljettajakoulutus}
            muutMaaraykset={muutMaaraykset}
            editValues={editValue}
            fields={fields}
          />
        )}
      </Row>
    );
  }
}

const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS);

MuutospyyntoWizardTutkinnot = connect(state => {
  const tutkintomuutoksetValue = selector(
    state,
    FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET
  );

  return {
    tutkintomuutoksetValue,
    koulutukset: state.koulutukset,
    paatoskierrokset: state.paatoskierrokset
  };
})(MuutospyyntoWizardTutkinnot);

export default reduxForm({
  form: FORM_NAME_UUSI_HAKEMUS,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  validate
})(MuutospyyntoWizardTutkinnot);
