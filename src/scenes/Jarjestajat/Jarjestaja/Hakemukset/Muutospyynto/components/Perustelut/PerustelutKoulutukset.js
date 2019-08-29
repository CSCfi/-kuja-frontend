import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import PerustelutValmentavatKoulutukset from "./PerustelutValmentavatKoulutukset";
import PerustelutATVKoulutukset from "./PerustelutATVKoulutukset";
import PerustelutTyovoimakoulutukset from "./PerustelutTyovoimakoulutukset";
// import Kuljettajakoulutukset from "./Koulutukset/Kuljettajakoulutukset";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutKoulutukset = React.memo(props => {
  const [changes, setChanges] = useState({});

  useEffect(() => {
    setChanges({
      atvkMuutokset: R.filter(
        changeObj =>
          R.startsWith(
            "ammatilliseentehtavaanvalmistavatkoulutukset",
            changeObj.anchor
          ),
        props.changes
      ),
      kuljettajakoulutuksetMuutokset: R.filter(
        changeObj => R.startsWith("kuljettajakoulutukset", changeObj.anchor),
        props.changes
      ),
      tyovoimakoulutuksetMuutokset: R.filter(
        changeObj => R.startsWith("tyovoimakoulutukset", changeObj.anchor),
        props.changes
      ),
      valmentavatKoulutuksetMuutokset: R.filter(
        changeObj => R.startsWith("valmentavatkoulutukset", changeObj.anchor),
        props.changes
      )
    });
  }, [props.changes]);

  return (
    <div className="py-16">
      {changes.valmentavatKoulutuksetMuutokset && (
        <PerustelutValmentavatKoulutukset
          changes={changes.valmentavatKoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}

      {changes.atvkMuutokset && (
        <PerustelutATVKoulutukset
          changes={changes.atvkMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}

      {changes.tyovoimakoulutuksetMuutokset && (
        <PerustelutTyovoimakoulutukset
          changes={changes.tyovoimakoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      )}

      {/* <Kuljettajakoulutukset
        backendChanges={kuljettajakoulutuksetMuutokset}
        kohde={props.kohde}
        koulutukset={props.koulutukset}
        maaraystyyppi={props.maaraystyyppi}
        onUpdate={props.onUpdate}
      /> */}
    </div>
  );
});

PerustelutKoulutukset.defaultProps = {
  changes: []
};

PerustelutKoulutukset.propTypes = {
  changes: PropTypes.array,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onUpdate: PropTypes.func
};

export default injectIntl(PerustelutKoulutukset);
