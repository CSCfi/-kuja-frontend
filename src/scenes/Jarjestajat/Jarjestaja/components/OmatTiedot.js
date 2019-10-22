import React, { useContext, useEffect, useMemo } from "react";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Loading from "../../../../modules/Loading";
import {
  InnerContentContainer,
  InnerContentWrapper
} from "../../../../modules/elements";
import { Typography } from "@material-ui/core";
import { BackendContext } from "../../../../context/backendContext";
import {
  abort,
  fetchFromBackend,
  getFetchState,
  statusMap
} from "../../../../services/backendService";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import * as R from "ramda";

const OmatTiedot = ({ intl, organisaatio, user }) => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);
  const { kunnat, maakunnat } = fromBackend;

  const fetchSetup = useMemo(() => {
    return [
      { key: "kunnat", dispatchFn: dispatch },
      { key: "maakunnat", dispatchFn: dispatch }
    ];
  }, [dispatch]);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const abortControllers = useMemo(() => {
    return fetchFromBackend(fetchSetup);
  }, [fetchSetup]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers, dispatch]);

  const fetchState = useMemo(() => {
    return getFetchState(fetchSetup, fromBackend);
  }, [fetchSetup, fromBackend]);

  const view = useMemo(() => {
    let jsx = <React.Fragment></React.Fragment>;
    let kotipaikka = null;
    if (fetchState.conclusion === statusMap.fetching) {
      jsx = <Loading percentage={fetchState.percentage.ready} />;
    } else if (organisaatio) {
      const postinumero = organisaatio.kayntiosoite.postinumeroUri
        ? organisaatio.kayntiosoite.postinumeroUri.substr(6)
        : null;
      const ppostinumero = organisaatio.postiosoite.postinumeroUri
        ? organisaatio.postiosoite.postinumeroUri.substr(6)
        : null;
      const email = (R.find(R.prop("email"), organisaatio.yhteystiedot) || {})
        .email;
      const numero = (R.find(R.prop("numero"), organisaatio.yhteystiedot) || {})
        .numero;
      const www = (R.find(R.prop("www"), organisaatio.yhteystiedot) || {}).www;
      if (fetchState.conclusion === statusMap.ready) {
        const koodiarvo = organisaatio.kotipaikkaUri.substr(6);
        const source = koodiarvo.length === 3 ? kunnat.raw : maakunnat.raw;
        const kotipaikkaObj = R.find(R.propEq("koodiArvo", koodiarvo), source);
        kotipaikka = (kotipaikkaObj
          ? R.find(
              R.propEq("kieli", R.toUpper(intl.locale)),
              kotipaikkaObj.metadata
            )
          : {}
        ).nimi;
      }
      jsx = (
        <InnerContentContainer>
          <InnerContentWrapper>
            <Typography component="h2" variant="h5" className="pb-4">
              {LUPA_TEKSTIT.OMATTIEDOT.OTSIKKO.FI}
            </Typography>
            <Typography component="h3" variant="h6">
              {LUPA_TEKSTIT.OMATTIEDOT.KAYNTIOSOITE.FI}
            </Typography>
            <p className="pb-4">
              {organisaatio.kayntiosoite.osoite}
              {postinumero && <span>,&nbsp;</span>}
              {postinumero}
              {organisaatio.kayntiosoite.postitoimipaikka && (
                <span>&nbsp;</span>
              )}
              {organisaatio.kayntiosoite.postitoimipaikka}
            </p>
            <Typography component="h3" variant="h6">
              {LUPA_TEKSTIT.OMATTIEDOT.POSTIOSOITE.FI}
            </Typography>
            <p className="pb-4">
              {organisaatio.postiosoite.osoite &&
                organisaatio.postiosoite.osoite}
              {ppostinumero && <span>,&nbsp;</span>}
              {ppostinumero && ppostinumero}&nbsp;
              {organisaatio.postiosoite.postitoimipaikka && <span>&nbsp;</span>}
              {organisaatio.postiosoite.postitoimipaikka}
            </p>
            <Typography component="h3" variant="h6">
              {LUPA_TEKSTIT.OMATTIEDOT.KOTIPAIKKA.FI}
            </Typography>
            <p className="pb-4">{kotipaikka && <span>{kotipaikka}</span>}</p>
            <Typography component="h3" variant="h6">
              {LUPA_TEKSTIT.OMATTIEDOT.YHTEYSTIEDOT.FI}
            </Typography>
            {numero && (
              <div className="flex border-b">
                <div className="w-1/2 sm:w-auto md:w-1/4 bg-gray-200 p-2 h-10">
                  <p>{LUPA_TEKSTIT.OMATTIEDOT.PUHELINNUMERO.FI}</p>
                </div>
                <div className="w-1/2 sm:w-auto md:w-3/4 bg-gray-100 p-2 h-10">
                  <p>
                    <a
                      title={`Call to number ${numero}`}
                      href={`tel:${numero}`}
                    >
                      {numero}
                    </a>
                  </p>
                </div>
              </div>
            )}
            {www && (
              <div className="flex border-b">
                <div className="w-1/2 sm:w-auto md:w-1/4  bg-gray-200 p-2 h-10">
                  <p>{LUPA_TEKSTIT.OMATTIEDOT.WWWW.FI}</p>
                </div>
                <div className="w-1/2 sm:w-auto md:w-3/4 bg-gray-100 p-2 h-10">
                  <p>
                    <a title={`Link to ${www}`} href={www}>
                      {www}
                    </a>
                  </p>
                </div>
              </div>
            )}
            {email && (
              <div className="flex border-b">
                <div className="w-1/2 sm:w-auto md:w-1/4 bg-gray-200 p-2 h-10">
                  <p>{LUPA_TEKSTIT.OMATTIEDOT.EMAIL.FI}</p>
                </div>
                <div className="w-1/2 sm:w-auto md:w-3/4 bg-gray-100 p-2 h-10">
                  <p>
                    <a title={`Mail to ${email}`} href={`mailto: ${email}`}>
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            )}
            <br />
            <p>{LUPA_TEKSTIT.OMATTIEDOT.INFO.FI}</p>
          </InnerContentWrapper>
        </InnerContentContainer>
      );
    }
    return jsx;
  }, [fetchState, kunnat, intl.locale, maakunnat, organisaatio]);
  return view;
};

OmatTiedot.propTypes = {
  organisaatio: PropTypes.object,
  user: PropTypes.object
};

export default injectIntl(OmatTiedot);
