import React from "react";
import PerustelutValmentavatKoulutukset from "./PerustelutValmentavatKoulutukset";
import PerustelutATVKoulutukset from "./PerustelutATVKoulutukset";
import PerustelutTyovoimakoulutukset from "./PerustelutTyovoimakoulutukset";
import PerustelutKuljettajakoulutukset from "./PerustelutKuljettajakoulutukset";
import PropTypes from "prop-types";
import * as R from "ramda";

const PerustelutKoulutukset = React.memo(props => {
  console.info(props.changeObjects);
  return (
    <React.Fragment>
      {props.kohde && props.maaraystyyppi ? (
        <div className="py-4">
          {!!R.path(
            ["koulutukset", "valmentavatKoulutukset"],
            props.changeObjects
          ) ? (
            <PerustelutValmentavatKoulutukset
              changeObjects={{
                koulutukset: {
                  valmentavatKoulutukset: R.path([
                    "koulutukset",
                    "valmentavatKoulutukset"
                  ])(props.changeObjects)
                },
                perustelut: {
                  koulutukset: {
                    valmentavatKoulutukset: R.path([
                      "perustelut",
                      "koulutukset",
                      "valmentavatKoulutukset"
                    ])(props.changeObjects)
                  }
                }
              }}
              isReadOnly={props.isReadOnly}
              kohde={props.kohde}
              koulutukset={props.koulutukset}
              maaraystyyppi={props.maaraystyyppi}
              onChangesRemove={props.onChangesRemove}
              onChangesUpdate={props.onChangesUpdate}
            />
          ) : null}

          {!R.isNil(props.changeObjects.koulutukset.atvKoulutukset) ? (
            <PerustelutATVKoulutukset
              changeObjects={{
                koulutukset: {
                  atvKoulutukset: R.path(
                    ["koulutukset", "atvKoulutukset"],
                    props.changeObjects
                  )
                },
                perustelut: {
                  koulutukset: {
                    atvKoulutukset: R.path(
                      ["perustelut", "koulutukset", "atvKoulutukset"],
                      props.changeObjects
                    )
                  }
                }
              }}
              isReadOnly={props.isReadOnly}
              kohde={props.kohde}
              koulutukset={props.koulutukset}
              maaraystyyppi={props.maaraystyyppi}
              onChangesRemove={props.onChangesRemove}
              onChangesUpdate={props.onChangesUpdate}
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
                    props.changeObjects.koulutukset.tyovoimakoulutukset
                },
                perustelut: {
                  koulutukset: {
                    tyovoimakoulutukset:
                      props.changeObjects.perustelut.koulutukset
                        .tyovoimakoulutukset
                  }
                }
              }}
              elykeskukset={props.elykeskukset}
              isReadOnly={props.isReadOnly}
              kohde={props.kohde}
              koulutukset={props.koulutukset}
              maaraystyyppi={props.maaraystyyppi}
              onChangesRemove={props.onChangesRemove}
              onChangesUpdate={props.onChangesUpdate}
            />
          ) : null}

          {!!R.path(
            ["koulutukset", "kuljettajakoulutukset"],
            props.changeObjects
          ) ? (
            <PerustelutKuljettajakoulutukset
              changeObjects={{
                koulutukset: {
                  kuljettajakoulutukset: R.path([
                    "koulutukset",
                    "kuljettajakoulutukset"
                  ])(props.changeObjects)
                },
                perustelut: R.path([
                  "perustelut",
                  "koulutukset",
                  "kuljettajakoulutukset"
                ])(props.changeObjects)
              }}
              isReadOnly={props.isReadOnly}
              kohde={props.kohde}
              koulutukset={props.koulutukset}
              maaraystyyppi={props.maaraystyyppi}
              onChangesRemove={props.onChangesRemove}
              onChangesUpdate={props.onChangesUpdate}
            />
          ) : null}
        </div>
      ) : null}
    </React.Fragment>
  );
});

PerustelutKoulutukset.defaultProps = {
  changeObjects: {},
  isReadOnly: false
};

PerustelutKoulutukset.propTypes = {
  changeObjects: PropTypes.object,
  elykeskukset: PropTypes.array,
  isReadOnly: PropTypes.bool,
  kohde: PropTypes.object,
  koulutukset: PropTypes.object,
  maaraystyyppi: PropTypes.object,
  muutoshakemus: PropTypes.object,
  onChangesUpdate: PropTypes.func
};

export default PerustelutKoulutukset;
