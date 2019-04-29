import React, { useContext, useEffect } from "react";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Loading from "../../../../modules/Loading";
import {
  InnerContentContainer,
  InnerContentWrapper
} from "../../../../modules/elements";
import { getToimialueByKoodiArvo } from "services/toimialueet/toimialueUtil";
import { fetchKunnat } from "../../../../services/kunnat/actions";
import { UserContext } from "context/userContext";
import { KunnatContext } from "context/kunnatContext";

const OmatTiedot = props => {
  const { user, userDispatch } = useContext(UserContext);
  const { kunnat, kunnatDispatch } = useContext(KunnatContext);

  useEffect(() => {
    fetchKunnat()(kunnatDispatch);
  }, []);

  const { oppilaitos } = user;
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
      if (
        this.props.kunnat &&
        this.props.kunnat.fetched &&
        oppilaitos.organisaatio.kotipaikkaUri
      )
        kotipaikka = getToimialueByKoodiArvo(
          oppilaitos.organisaatio.kotipaikkaUri.substr(6)
        ).label;
      // jos tietoja enemmän, ottaa jälkimmäisen arvon (yleiset yhteystiedot)
      if (oppilaitos.organisaatio.yhteystiedot)
        oppilaitos.organisaatio.yhteystiedot.map(item => {
          if (item.www) www = item.www;
          if (item.numero) numero = item.numero;
          if (item.email) email = item.email;
        });
    }
  }

  if (oppilaitos && oppilaitos.organisaatio)
    return (
      <InnerContentContainer>
        <InnerContentWrapper>
          <h2>{LUPA_TEKSTIT.OMATTIEDOT.OTSIKKO.FI}</h2>
          <h3>{LUPA_TEKSTIT.OMATTIEDOT.KAYNTIOSOITE.FI}</h3>
          <p>
            {oppilaitos.organisaatio.kayntiosoite.osoite}
            {postinumero && <span>,&nbsp;</span>}
            {postinumero}
            {oppilaitos.organisaatio.kayntiosoite.postitoimipaikka && (
              <span>&nbsp;</span>
            )}
            {oppilaitos.organisaatio.kayntiosoite.postitoimipaikka}
          </p>
          <h3>{LUPA_TEKSTIT.OMATTIEDOT.POSTIOSOITE.FI}</h3>
          <p>
            {oppilaitos.organisaatio.postiosoite.osoite &&
              oppilaitos.organisaatio.postiosoite.osoite}
            {ppostinumero && <span>,&nbsp;</span>}
            {ppostinumero && ppostinumero}&nbsp;
            {oppilaitos.organisaatio.postiosoite.postitoimipaikka && (
              <span>&nbsp;</span>
            )}
            {oppilaitos.organisaatio.postiosoite.postitoimipaikka}
          </p>
          <h3>{LUPA_TEKSTIT.OMATTIEDOT.KOTIPAIKKA.FI}</h3>
          {numero && <p>{kotipaikka}</p>}
          <h3>{LUPA_TEKSTIT.OMATTIEDOT.YHTEYSTIEDOT.FI}</h3>
          {numero && (
            <p>
              <b>{LUPA_TEKSTIT.OMATTIEDOT.PUHELINNUMERO.FI}:</b> {numero}
            </p>
          )}
          {www && (
            <p>
              <b>{LUPA_TEKSTIT.OMATTIEDOT.WWWW.FI}:</b>{" "}
              <a href={www} target="full">
                {www}
              </a>
            </p>
          )}
          {email && (
            <p>
              <b>{LUPA_TEKSTIT.OMATTIEDOT.EMAIL.FI}:</b> {email}
            </p>
          )}
          <br />
          <p>{LUPA_TEKSTIT.OMATTIEDOT.INFO.FI}</p>
        </InnerContentWrapper>
      </InnerContentContainer>
    );
  else return <Loading />;

  // Käyntiosoite: Hallilantie 24 , 33820  TAMPERE
  // Postiosoite: Ahlmanin koulu Hallilantie 24 , 33820  TAMPERE
  // Puhelinnumero: 03 3399 2500
  // Www-osoite: http://www.ahlman.fi
  // Sähköpostiosoite: ahlman@ahlman.fi
  // Sivulle myös info: Tiedot tulevat Opetushallituksen Organisaatiotietopalvelusta, joka päivittää ne Yritys- ja yhteisötietojärjestelmästä. Muutokset tietoihin sitä kautta.
};

export default OmatTiedot;
