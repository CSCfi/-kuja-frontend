import React, { useContext, useEffect } from "react";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Loading from "../../../../modules/Loading";
import {
  InnerContentContainer,
  InnerContentWrapper
} from "../../../../modules/elements";
import { getToimialueByKoodiArvo } from "services/toimialueet/toimialueUtil";
import { fetchKunnat } from "../../../../services/kunnat/actions";
import { fetchMaakunnat } from "../../../../services/maakunnat/actions";
import { UserContext } from "context/userContext";
import { KunnatContext } from "context/kunnatContext";
import { MaakunnatContext } from "context/maakunnatContext";
import { Typography } from "@material-ui/core";

const OmatTiedot = () => {
  const { state: user } = useContext(UserContext);
  const { state: kunnat, dispatch: kunnatDispatch } = useContext(KunnatContext);
  const { state: maakunnat, dispatch: maakunnatDispatch } = useContext(
    MaakunnatContext
  );

  useEffect(() => {
    fetchKunnat()(kunnatDispatch);
    fetchMaakunnat()(maakunnatDispatch);
  }, [kunnatDispatch, maakunnatDispatch]);
  const { oppilaitos } = user || {};
  let postinumero = undefined;
  let ppostinumero = undefined;
  let numero = undefined;
  let www = undefined;
  let email = undefined;
  let kotipaikka = undefined;
  if (oppilaitos) {
    if (oppilaitos.organisaatio) {
      if (oppilaitos.organisaatio.kayntiosoite.postinumeroUri)
        postinumero = oppilaitos.organisaatio.kayntiosoite.postinumeroUri.substr(
          6
        );
      if (oppilaitos.organisaatio.postiosoite.postinumeroUri)
        ppostinumero = oppilaitos.organisaatio.postiosoite.postinumeroUri.substr(
          6
        );
      if (kunnat && kunnat.fetched && oppilaitos.organisaatio.kotipaikkaUri)
        kotipaikka = getToimialueByKoodiArvo(
          oppilaitos.organisaatio.kotipaikkaUri.substr(6),
          maakunnat,
          kunnat
        ).label;
      // jos tietoja enemmän, ottaa jälkimmäisen arvon (yleiset yhteystiedot)
      if (oppilaitos.organisaatio.yhteystiedot)
        oppilaitos.organisaatio.yhteystiedot.map(item => {
          if (item.www) www = item.www;
          if (item.numero) numero = item.numero;
          if (item.email) email = item.email;
          return true;
        });
    }
  }

  if (oppilaitos && oppilaitos.organisaatio) {
    return (
      <InnerContentContainer>
        <InnerContentWrapper>
          <Typography component="h2" variant="h5" className="pb-4">
            {LUPA_TEKSTIT.OMATTIEDOT.OTSIKKO.FI}
          </Typography>
          <Typography component="h3" variant="h6">
            {LUPA_TEKSTIT.OMATTIEDOT.KAYNTIOSOITE.FI}
          </Typography>
          <p className="pb-4">
            {oppilaitos.organisaatio.kayntiosoite.osoite}
            {postinumero && <span>,&nbsp;</span>}
            {postinumero}
            {oppilaitos.organisaatio.kayntiosoite.postitoimipaikka && (
              <span>&nbsp;</span>
            )}
            {oppilaitos.organisaatio.kayntiosoite.postitoimipaikka}
          </p>
          <Typography component="h3" variant="h6">
            {LUPA_TEKSTIT.OMATTIEDOT.POSTIOSOITE.FI}
          </Typography>
          <p className="pb-4">
            {oppilaitos.organisaatio.postiosoite.osoite &&
              oppilaitos.organisaatio.postiosoite.osoite}
            {ppostinumero && <span>,&nbsp;</span>}
            {ppostinumero && ppostinumero}&nbsp;
            {oppilaitos.organisaatio.postiosoite.postitoimipaikka && (
              <span>&nbsp;</span>
            )}
            {oppilaitos.organisaatio.postiosoite.postitoimipaikka}
          </p>
          <Typography component="h3" variant="h6">
            {LUPA_TEKSTIT.OMATTIEDOT.KOTIPAIKKA.FI}
          </Typography>
          <p className="pb-4">{numero && <span>{kotipaikka}</span>}</p>
          <Typography component="h3" variant="h6">
            {LUPA_TEKSTIT.OMATTIEDOT.YHTEYSTIEDOT.FI}
          </Typography>
          {numero && (
            <div className="flex border-b">
              <div className="w-1/2 bg-gray-200 p-2 h-10">
                <p>{LUPA_TEKSTIT.OMATTIEDOT.PUHELINNUMERO.FI}:</p>
              </div>
              <div className="w-1/2 bg-gray-100 p-2 h-10">
                <p>
                  <a title={`Call to number ${numero}`} href={`tel:${numero}`}>
                    {numero}
                  </a>
                </p>
              </div>
            </div>
          )}
          {www && (
            <div className="flex border-b">
              <div className="w-1/2 bg-gray-200 p-2 h-10">
                <p>{LUPA_TEKSTIT.OMATTIEDOT.WWWW.FI}:</p>
              </div>
              <div className="w-1/2 bg-gray-100 p-2 h-10">
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
              <div className="w-1/2 bg-gray-200 p-2 h-10">
                <p>{LUPA_TEKSTIT.OMATTIEDOT.EMAIL.FI}:</p>
              </div>
              <div className="w-1/2 bg-gray-100 p-2 h-10">
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
  } else {
    return <Loading />;
  }
};

export default OmatTiedot;
