import React from "react";
import { injectIntl } from "react-intl";
import PerustelutValmentavatKoulutukset from "./PerustelutValmentavatKoulutukset";
import PerustelutATVKoulutukset from "./PerustelutATVKoulutukset";
import PerustelutTyovoimakoulutukset from "./PerustelutTyovoimakoulutukset";
import PerustelutKuljettajakoulutukset from "./PerustelutKuljettajakoulutukset";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutKoulutukset = React.memo(props => {
  return (
    <React.Fragment>
      {props.kohde && props.maaraystyyppi && props.muutoshakemus ? (
        <div className="py-16">
          {!!R.path(
            ["koulutukset", "valmentavatKoulutukset"],
            props.changeObjects
          ) ? (
            <PerustelutValmentavatKoulutukset
              changeObjects={{
                koulutukset: {
                  valmentavatKoulutukset:
                    R.path(["koulutukset", "valmentavatKoulutukset"])(
                      props.changeObjects
                    ) || []
                },
                perustelut: {
                  koulutukset: {
                    valmentavatKoulutukset:
                      R.path([
                        "perustelut",
                        "koulutukset",
                        "valmentavatKoulutukset"
                      ])(props.changeObjects) || []
                  }
                }
              }}
              kohde={props.kohde}
              koulutukset={props.koulutukset}
              maaraystyyppi={props.maaraystyyppi}
              onChangesRemove={props.onChangesRemove}
              onChangesUpdate={props.onChangesUpdate}
              stateObject={R.path(
                ["perustelut", "koulutukset", "valmentavatKoulutukset"],
                props.muutoshakemus
              )}
              onStateUpdate={props.onStateUpdate}
            />
          ) : null}

          {!!R.path(
            ["koulutukset", "tyovoimakoulutukset"],
            props.changeObjects
          ) ? (
            <PerustelutTyovoimakoulutukset
              changeObjects={{
                koulutukset: {
                  tyovoimakoulutukset:
                    R.path(["koulutukset", "tyovoimakoulutukset"])(
                      props.changeObjects
                    ) || []
                },
                perustelut: {
                  koulutukset: {
                    tyovoimakoulutukset:
                      R.path([
                        "perustelut",
                        "koulutukset",
                        "tyovoimakoulutukset"
                      ])(props.changeObjects) || []
                  }
                }
              }}
              kohde={props.kohde}
              koulutukset={props.koulutukset}
              maaraystyyppi={props.maaraystyyppi}
              onChangesRemove={props.onChangesRemove}
              onChangesUpdate={props.onChangesUpdate}
              stateObject={R.path(
                ["perustelut", "koulutukset", "tyovoimakoulutukset"],
                props.muutoshakemus
              )}
              onStateUpdate={props.onStateUpdate}
            />
          ) : null}

          {/* {changes.atvkMuutokset.length ? (
        <PerustelutATVKoulutukset
          changes={changes.atvkMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      ) : null}

      {changes.tyovoimakoulutuksetMuutokset.length ? (
        <PerustelutTyovoimakoulutukset
          changes={changes.tyovoimakoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      ) : null}

      {changes.kuljettajakoulutuksetMuutokset.length ? (
        <PerustelutKuljettajakoulutukset
          changes={changes.kuljettajakoulutuksetMuutokset}
          kohde={props.kohde}
          koulutukset={props.koulutukset}
          lomakkeet={props.lomakkeet}
          maaraystyyppi={props.maaraystyyppi}
          onUpdate={props.onUpdate}
        />
      ) : null} */}
        </div>
      ) : null}
    </React.Fragment>
  );
});

PerustelutKoulutukset.defaultProps = {
  changeObjects: {}
};

PerustelutKoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  lomakkeet: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  onChangesUpdate: PropTypes.func,
  muutoshakemus: PropTypes.object,
  onStateUpdate: PropTypes.func
};

export default injectIntl(PerustelutKoulutukset);
