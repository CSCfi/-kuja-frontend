import React, { useContext, useEffect } from "react";
import TutkintokieliList from "./TutkintokieliList";
import { parseLocalizedField } from "../../../../../../../modules/helpers";
import { fetchKielet } from "../../../../../../../services/kielet/actions";
import { KieletContext } from "../../../../../../../context/kieletContext";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import _ from "lodash";

const Tutkintokielet = props => {
  const { state: languages, dispatch: languagesDispatch } = useContext(
    KieletContext
  );
  const { lupa } = props;
  const { kohteet } = lupa;
  const koulutusdata = props.koulutukset.koulutusdata;
  const koulutusDataSorted = _.sortBy(koulutusdata, d => {
    return d.koodiArvo;
  });

  useEffect(() => {
    fetchKielet(props.intl.locale)(languagesDispatch);
  }, [languagesDispatch, props.intl.locale]);

  return (
    <React.Fragment>
      {_.map(koulutusDataSorted, (koulutusala, i) => {
        const koodiarvo = koulutusala.koodiarvo || koulutusala.koodiArvo;
        const { metadata, koulutukset } = koulutusala;
        const nimi = parseLocalizedField(metadata);
        return (
          <TutkintokieliList
            key={i}
            koodiarvo={koodiarvo}
            areaCode={koodiarvo}
            title={nimi}
            koulutustyypit={koulutukset}
            kielet={languages ? languages.data.kielet : []}
            articles={kohteet[1].maaraykset}
            changes={props.changes ? props.changes[koodiarvo] : []}
            listId={koodiarvo}
            locale={props.intl.locale}
          />
        );
      })}
    </React.Fragment>
  );
};

Tutkintokielet.propTypes = {
  koulutukset: PropTypes.object,
  lupa: PropTypes.object,
  onChanges: PropTypes.func
};

export default injectIntl(Tutkintokielet);
