import React, { useContext, useEffect } from "react";
import Tutkinnot from "./Tutkinnot";
import MuutospyyntoWizardKoulutukset from "./MuutospyyntoWizardKoulutukset";
import MuutospyyntoWizardKielet from "./MuutospyyntoWizardKielet";
import { fetchKoulutusalat } from "services/koulutusalat/actions";
import { KoulutusalatContext } from "context/koulutusalatContext";
import { KoulutuksetContext } from "context/koulutuksetContext";
import { fetchKoulutuksetAll } from "../../../../../../services/koulutukset/actions";
import { KoulutustyypitContext } from "context/koulutustyypitContext";
import { fetchKoulutustyypit } from "services/koulutustyypit/actions";
import wizardMessages from "../../../../../../i18n/definitions/wizard";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

const MuutospyyntoWizardMuutokset = props => {
  const { state: koulutukset, dispatch: koulutuksetDispatch } = useContext(
    KoulutuksetContext
  );
  const { state: koulutusalat, dispatch: koulutusalatDispatch } = useContext(
    KoulutusalatContext
  );
  const {
    state: koulutustyypit,
    dispatch: koulutustyypitDispatch
  } = useContext(KoulutustyypitContext);
  const {
    intl: { formatMessage }
  } = props;

  useEffect(() => {
    fetchKoulutusalat()(koulutusalatDispatch);
    fetchKoulutustyypit()(koulutustyypitDispatch);
  }, [koulutusalatDispatch, koulutustyypitDispatch]);

  useEffect(() => {
    if (koulutusalat.fetched && koulutustyypit.fetched) {
      fetchKoulutuksetAll(koulutusalat.data, koulutustyypit.data)(
        koulutuksetDispatch
      );
    }
  }, [koulutusalat, koulutustyypit, koulutuksetDispatch]);

  return (
    <div>
      <p className="py-10">{formatMessage(wizardMessages.info_01)}</p>

      <form onSubmit={props.handleSubmit}>
        {koulutukset &&
          koulutusalat &&
          koulutustyypit &&
          Object.keys(koulutukset.koulutusdata).length > 0 && (
            <Tutkinnot
              lupa={props.lupa}
              koulutukset={koulutukset}
              koulutusalat={koulutusalat}
              koulutustyypit={koulutustyypit.data}
            />
          )}

        {koulutukset && (
          <MuutospyyntoWizardKoulutukset
            lupa={props.lupa}
            koulutukset={koulutukset}
            koulutusalat={koulutusalat}
            koulutustyypit={koulutustyypit}
          />
        )}

        <MuutospyyntoWizardKielet lupa={props.lupa} koulutukset={koulutukset} />

        {/* <Kohde>
          <MuutospyyntoWizardToimialue lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardOpiskelijavuodet lupa={lupa} />
        </Kohde>

        <Kohde>
          <MuutospyyntoWizardMuutContainer lupa={lupa} />
        </Kohde> */}
      </form>
    </div>
  );
};

MuutospyyntoWizardMuutokset.propTypes = {
  lupa: PropTypes.object
};

export default injectIntl(MuutospyyntoWizardMuutokset);
