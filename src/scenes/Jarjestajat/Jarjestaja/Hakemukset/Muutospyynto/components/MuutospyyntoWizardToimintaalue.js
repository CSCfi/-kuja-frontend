import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import Section from "components/03-templates/Section";
import Toimialuemuutokset from "../components/Toimialuemuutokset";
import Toimialuevalinta from "../components/Toimialuevalinta";
import Valtakunnallinen from "../components/Valtakunnallinen";
import * as R from "ramda";

const MuutospyyntoWizardToimintaalue = React.memo(props => {
  const sectionId = "toimintaalue";
  const heading = props.intl.formatMessage(wizardMessages.header_section3);
  const [initialValueOfSelect, setInitialValueOfSelect] = useState([]);
  const [valueOfSelect, setValueOfSelect] = useState([]);
  const [changesOfValtakunnallinen, setChangesOfValtakunnallinen] = useState(
    {}
  );
  const { onUpdate } = props;

  useEffect(() => {
    const kunnat = R.flatten(
      R.map(R.prop("kunta"), props.maakuntakunnat.maakuntakunnatList)
    );

    const valitutMaakunnat = R.map(maakunta => {
      return R.find(R.propEq("koodiArvo", maakunta.koodiarvo))(
        props.maakuntakunnat.maakuntakunnatList
      );
    }, props.lupakohde.maakunnat);

    const valitutKunnat = R.map(kunta => {
      return R.find(R.propEq("koodiArvo", kunta.koodiarvo))(kunnat);
    }, props.lupakohde.kunnat);

    const initialValueOfSelect = R.concat(valitutKunnat, valitutMaakunnat);

    setInitialValueOfSelect(initialValueOfSelect);
    setValueOfSelect(initialValueOfSelect);
  }, [
    props.lupakohde,
    props.kunnat,
    props.maakunnat,
    props.maakuntakunnat,
    props.changes
  ]);

  useEffect(() => {
    onUpdate({
      sectionId,
      state: {
        changesOfValtakunnallinen,
        initialValueOfSelect,
        kohde: props.kohde,
        maaraystyyppi: props.maaraystyyppi,
        valueOfSelect
      }
    });
  }, [changesOfValtakunnallinen, initialValueOfSelect, onUpdate, valueOfSelect]);

  const handleNewValueOfToimialuevalinta = value => {
    console.info(initialValueOfSelect, value);
    setValueOfSelect(value);
  };

  const handleChangeOfValtakunnallinen = ({ isChecked }) => {
    setChangesOfValtakunnallinen(
      Object.assign({}, changesOfValtakunnallinen, { isChecked })
    );
  };

  return (
    <Section code={props.lupakohde.headingNumber} title={heading}>
      <p className="pb-4">
        {props.intl.formatMessage(wizardMessages.areasInfo1)}
      </p>
      <div className="bg-gray-100 p-6">
        <Toimialuevalinta
          maakuntakunnatList={props.maakuntakunnat.maakuntakunnatList}
          value={valueOfSelect}
          callback={handleNewValueOfToimialuevalinta}
        />

        <Toimialuemuutokset
          name="toimintaalueet"
          initialValues={initialValueOfSelect}
          values={valueOfSelect}
        />
      </div>
      <Valtakunnallinen
        callback={handleChangeOfValtakunnallinen}
        changes={changesOfValtakunnallinen}
        isCheckedInitial={!!props.lupakohde.valtakunnallinen}
      />
    </Section>
  );
});

MuutospyyntoWizardToimintaalue.defaultProps = {
  changes: [],
  kohde: {},
  kunnat: {},
  lupakohde: {},
  maakunnat: {},
  maakuntakunnat: {},
  maaraystyyppi: {}
};

MuutospyyntoWizardToimintaalue.propTypes = {
  changes: PropTypes.array,
  kohde: PropTypes.object,
  kunnat: PropTypes.object,
  lupakohde: PropTypes.object,
  maakunnat: PropTypes.object,
  maakuntakunnat: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(MuutospyyntoWizardToimintaalue);
