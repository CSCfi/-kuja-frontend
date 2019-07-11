import _ from "lodash";
import React, { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import CheckboxWithLabel from "../../../../../../components/01-molecules/CheckboxWithLabel";

import { injectIntl } from "react-intl";

import { fetchKunnat } from "../../../../../../services/kunnat/actions"
import { KunnatContext } from "context/kunnatContext";
import { fetchMaakunnat } from "../../../../../../services/maakunnat/actions"
import { MaakunnatContext } from "context/maakunnatContext"

import { fetchMaakuntakunnat } from "../../../../../../services/maakuntakunnat/actions"
import { MaakuntakunnatContext } from "context/maakuntakunnatContext"

import wizardMessages from "../../../../../../i18n/definitions/wizard";
import Section from "components/03-templates/Section";

import Loading from "../../../../../../modules/Loading";
import {
  // Kohdenumero,
  // Otsikko,
  Row,
  CheckboxRowContainer,
  // Nimi
} from "./MuutospyyntoWizardComponents";
import {
  getToimialueByKoodiArvo,
  handleToimialueSelectChange
} from "services/toimialueet/toimialueUtil";
import { handleSimpleCheckboxChange } from "../../../../../../services/koulutukset/koulutusUtil";
import {
  FIELD_ARRAY_NAMES,
  MUUTOS_TYPES
} from "../modules/uusiHakemusFormConstants";

const MuutospyyntoWizardToimintaalue = React.memo(props => {
  const heading = props.intl.formatMessage(wizardMessages.header_section3);
  const { state: kunnat, dispatch: kunnatDispatch } = useContext(KunnatContext);
  const { state: maakunnat, dispatch: maakunnatDispatch } = useContext(MaakunnatContext);
  const { state: maakuntakunnat, dispatch: maakuntakunnatDispatch } = useContext(MaakuntakunnatContext);
  const [kuntaMaaraykset, setKuntamaaraykset] = useState([]);
  const [maakuntaMaaraykset, setMaakuntaMaaraykset] = useState([]);
  const [valtakunnallinen, setValtakunnallinen] = useState([]);
  const { headingNumber } = props.lupa.kohteet[3];

  useEffect(() => {
    fetchKunnat()(kunnatDispatch);
    fetchMaakunnat()(maakunnatDispatch);
    fetchMaakuntakunnat()(maakuntakunnatDispatch);
  }, [kunnatDispatch, maakunnatDispatch, maakuntakunnatDispatch]);
  // }, [kunnat, maakunnat, maakuntakunnat, dispatch]);

  useEffect(() => {
    setKuntamaaraykset(props.lupa.kohteet[3].kunnat);
    // const {
    //   lupa,
    //   valtakunnallinenmuutoksetValue,
    //   toimialuemuutoksetValue
    // } = props;
    setMaakuntaMaaraykset(props.lupa.kohteet[3].maakunnat);
    setValtakunnallinen(props.lupa.kohteet[3].valtakunnallinen || false);
  }, [props.lupa]);

  // useEffect(() => {
  //   console.log(kunnat);
  //   console.log(maakunnat);
  //   console.log(maakuntakunnat);
  // }, [kunnat, maakunnat, maakuntakunnat]);

  if (kunnat.fetched && maakunnat.fetched && maakuntakunnat.fetched) {
    return (
      <Section code={headingNumber} title={heading}>
        <Row>
          <p>{ props.intl.formatMessage(wizardMessages.areasInfo1) }</p>
        </Row>
        <Row>
          <RenderToimialueMuutokset
            name={FIELD_ARRAY_NAMES.TOIMINTA_ALUEET}
            maakunnat={maakuntaMaaraykset}
            kunnat={kuntaMaaraykset}
            // editValues={toimialuemuutoksetValue}
            editValues={null}
            maakuntaList={maakunnat.data}
            kuntaList={kunnat.data}
            maakuntakunnatList={maakuntakunnat.maakuntakunnatList}
            valtakunnallinen={valtakunnallinen}
            intl={props.intl}
          />
        </Row>
        <Row>
          <RenderValtakunnallinen
            name="valtakunnallinen"
            // editValues={valtakunnallinenmuutoksetValue}
            editValues={null}
            valtakunnallinen={valtakunnallinen}
            intl={props.intl}
          />
        </Row>
      </Section>
    );
  }
  else {
    return <Loading />;
  }
});

const RenderToimialueMuutokset = props => {
  const { maakunnat, kunnat, maakuntakunnatList, editValues, fields } = props;
  let opts = [];
  let initialValue = [];
  let valitutMaakunnat = [];
  let valitutKunnat = [];

  _.forEach(maakuntakunnatList, maakunta => {
    opts.push(maakunta);
    _.forEach(maakunta.kunta, kunta => {
      opts.push(kunta);
    });
  });

  maakunnat.forEach(maakunta => {
    initialValue.push( {value: maakunta.koodiarvo, label: maakunta.arvo} );
  });
  kunnat.forEach(kunta => {
    initialValue.push( {value: kunta.koodiarvo, label: kunta.arvo} );
  });

  if (editValues) {
    editValues.forEach(value => {
      if (value.type === MUUTOS_TYPES.ADDITION) {
        initialValue.push(value.value);
      } else if (value.type === MUUTOS_TYPES.REMOVAL) {
        // Jätetään poistettu toimialue näkyville
        // if (_.includes(initialValue, value.value)) {
        //   _.pull(initialValue, value.value)
        // }
      }
    });
  }

  if (initialValue) {
    initialValue.forEach(value => {
      const alue = getToimialueByKoodiArvo(value);

      if (alue) {
        if (editValues) {
          const val = _.find(editValues, editValue => {
            return editValue.koodiArvo === value;
          });
          if (val) {
            alue.type = val.type;
          }
        }

        if (alue.tyyppi === "maakunta") {
          valitutMaakunnat.push(alue);
        } else if (alue.tyyppi === "kunta") {
          valitutKunnat.push(alue);
        }
      }
    });
  }

  return (
    <div>
      <p>{ props.intl.formatMessage(wizardMessages.areasInfo2) }</p>
      <ToimialueSelect
        options={opts}
        value={initialValue}
        initialValue={initialValue}
        editValues={editValues}
        fields={fields}
      />

      {initialValue && initialValue.length === 0 && (
        <h4>{ props.intl.formatMessage(wizardMessages.noArea) }</h4>
      )}

      {valitutMaakunnat.length > 0 && (
        <div>
          <h4>{ props.intl.formatMessage(wizardMessages.counties) }</h4>
          {valitutMaakunnat.map(alue => {
            const { label, type } = alue;
            const customClass =
              type === MUUTOS_TYPES.ADDITION
                ? "is-added"
                : type === MUUTOS_TYPES.REMOVAL
                  ? "is-removed"
                  : "is-in-lupa";
            return (
              <div key={label} className={customClass}>
                {label}
              </div>
            );
          })}
        </div>
      )}

      {valitutKunnat.length > 0 && (
        <div>
          <h4>{ props.intl.formatMessage(wizardMessages.municipalities) }</h4>
          {valitutKunnat.map(alue => {
            const { label, type } = alue;
            const customClass =
              type === MUUTOS_TYPES.ADDITION
                ? "is-added"
                : type === MUUTOS_TYPES.REMOVAL
                  ? "is-removed"
                  : "is-in-lupa";
            return (
              <div key={label} className={customClass}>
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const RenderValtakunnallinen = props => {
  const { editValues, fields } = props;
  let { valtakunnallinen } = props;

  let isInLupa = false;
  let isChecked = false;

  if (valtakunnallinen) {
    isChecked = true;
    isInLupa = true;
  } else {
    valtakunnallinen = { koodisto: "nuts1", koodiarvo: "FI1" };

    if (editValues) {
      const found = _.find(editValues, value => {
        return value.koodiarvo === "FI1";
      });
      if (found) {
        isChecked = true;
      }
    }
  }

  return (
    <div>
      <p className="mb-1">{ props.intl.formatMessage(wizardMessages.areasInfo3) }</p>
      <CheckboxRowContainer>
        <CheckboxWithLabel
          name="valtakunnallinencheckbox"
          id="valtakunnallinencheckbox"
          type="checkbox"
          checked={isChecked}
          onChange={e => {
            handleSimpleCheckboxChange(
              e,
              editValues,
              fields,
              isInLupa,
              valtakunnallinen
            );
          }}
        >
          { props.intl.formatMessage(wizardMessages.responsibilities) }
        </CheckboxWithLabel>
      </CheckboxRowContainer>
    </div>
  );
}

const ToimialueSelect = React.memo(props => {

  const [value, setValue] = useState(props.value);

  const handleSelectChange = selectedvalue => {
    setValue(selectedvalue);
    const { editValues, fields, initialValue } = props;
    handleToimialueSelectChange(editValues, fields, initialValue, value);
  }

  const searchFilter = (option, searchText) => {
    if (
      option.data.label.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  let { options } = props;

  return (
    <Select
      name="toimialue"
      isMulti
      value={value}
      onChange={handleSelectChange}
      inputProps={{
        id: 'select-multiple',
      }}
      options={options}
      getOptionLabel={option =>
        `${option.label}`
      }
      getOptionValue={option => `${option.value}`}
      isSearchable={true}
      searchFilter={searchFilter}
    />
  );
});

// const selector = formValueSelector(FORM_NAME_UUSI_HAKEMUS)

// MuutospyyntoWizardToimialue = connect(state => {
//   const toimialuemuutoksetValue = selector(state, FIELD_ARRAY_NAMES.TOIMINTA_ALUEET)
//   const valtakunnallinenmuutoksetValue = selector(state, 'valtakunnallinen')

//   return {
//     valtakunnallinenmuutoksetValue,
//     toimialuemuutoksetValue
//   }
// })(MuutospyyntoWizardToimialue)

// export default reduxForm({
//   form: FORM_NAME_UUSI_HAKEMUS,
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true,
//   // validate,
// })(MuutospyyntoWizardToimialue)

export default injectIntl(MuutospyyntoWizardToimintaalue);