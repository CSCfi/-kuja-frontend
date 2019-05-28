import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import Media from "react-media";
import { Td, Tr, TdButton } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Cancel from "@material-ui/icons/Cancel";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const LupaText = styled.span`
  margin: 10px;

  @media ${MEDIA_QUERIES.MOBILE} {
    display: flex;
    flex-direction: column;
  }
`;

const TextPartial = styled.span`
  margin-right: 10px;
`;

const JarjestamislupaAsiakirjatItem = props => {
  const { diaarinumero, voimassaoloalkupvm, paatospvm } = props.lupaHistoria;

  const state = {
    draft: "Luonnos",
    ready: "Valmis"
  };

  const type = {
    application: "Hakemus",
    attachement: "Liite",
    attachementConfidential: "Liite (salassa pidettävä)",
    supplement: "Täydennys",
    answer: "Vastaus kuulemispyyntöön",
    cancelation: "Hakemuksen peruutus",
    supplementRequest: "Täydennyspyyntö",
    auditionRequest: "Kuulemispyyntö",
    decision: "Päätös",
    correctionDecision: "Korjauspäätös",
    remediationDecision: "Oikaisupäätös",
    arrangementCancelation: "Järjestämisluvan peruutus",
    decisionArrangementCancelation: "Päätös järjestämisluvan peruuttamisesta"
  };

  const open = (e, nro) => {
    e.stopPropagation();
    console.log("open " + nro);
  };

  const refill = (e, nro) => {
    e.stopPropagation();
    console.log("refill " + nro);
  };

  const cancel = (e, nro) => {
    e.stopPropagation();
    console.log("cancel " + nro);
  };

  const remove = (e, nro) => {
    e.stopPropagation();
    console.log("delete " + nro);
  };

  return (
    <div onClick={e => open(e, diaarinumero)}>
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Tr>
            <LupaText>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.ASIAKIRJA.FI}
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.TILA.FI}:&nbsp;
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.LAATIJA.FI}:&nbsp;
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.VALMIS.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
              </TextPartial>
            </LupaText>
          </Tr>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <Tr>
            <Td flex="2">
              {/* Mok */}
              {diaarinumero.endsWith("7") ? type.application : type.supplement}
            </Td>
            <Td flex="2">
              {/* Mok */}
              {diaarinumero.endsWith("7") ? state.ready : state.draft}
            </Td>
            <Td flex="3">Jyväskylän koulutuskuntayhtymä</Td>
            <Td flex="2">
              <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
            </Td>
            <TdButton>
              {/* Mok */}
              {diaarinumero.endsWith("7") ? (
                <Button
                  onClick={e => refill(e, diaarinumero)}
                  title="Täydennä hakemusta"
                >
                  <Edit />
                </Button>
              ) : null}
            </TdButton>
            <TdButton>
              {!diaarinumero.endsWith("7") ? (
                <Button
                  onClick={e => remove(e, diaarinumero)}
                  title={LUPA_TEKSTIT.ASIAT.POISTA_TAYDENNYS.FI}
                >
                  <Delete />
                </Button>
              ) : (
                <Button
                  onClick={e => cancel(e, diaarinumero)}
                  title={LUPA_TEKSTIT.ASIAT.PERUUTA_HAKEMUS.FI}
                >
                  <Cancel />
                </Button>
              )}
            </TdButton>
          </Tr>
        )}
      />
    </div>
  );
};

export default JarjestamislupaAsiakirjatItem;
