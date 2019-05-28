import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import Media from "react-media";
import { Tr } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";

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

const JarjestamislupaAsiaListItem = props => {
  const {
    diaarinumero,
    voimassaoloalkupvm,
    voimassaololoppupvm,
    paatospvm
  } = props.lupaHistoria;

  const refill = (e, nro) => {
    e.stopPropagation();
    console.log("refill " + nro);
  };

  const open = (e, nro) => {
    e.stopPropagation();
    props.setOpened(nro);
  };

  const cancel = (e, nro) => {
    e.stopPropagation();
    console.log("cancel " + nro);
  };

  return (
    <React.Fragment>
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Tr>
            <LupaText>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.DNRO.FI}: OKM/{diaarinumero}
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.ASIA.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.MAARAAIKA.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.PAATETTY.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
              </TextPartial>
            </LupaText>
          </Tr>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <TableRow onClick={e => open(e, diaarinumero)}>
            <TableCell size="small">
              <Typography component="span">OKM/{diaarinumero}</Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span">
                {diaarinumero.endsWith("7")
                  ? "Uusi järjestämislupa"
                  : "Järjestämisluvan muutos"}
              </Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span">
                {diaarinumero.endsWith("7") ? "Käsittelyssä" : "Täydennettävä"}
              </Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span" noWrap={true}>
                <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
              </Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span" noWrap={true}>
                <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
              </Typography>
            </TableCell>
            <TableCell size="small">
              <div className="flex">
                <Button
                  title="Täydennä hakemusta"
                  onClick={e => refill(e, diaarinumero)}
                >
                  <Edit />
                </Button>
                {diaarinumero.endsWith("7") ? (
                  <Button
                    title="Peruuta hakemus"
                    onClick={e => cancel(e, diaarinumero)}
                  >
                    <Cancel />
                  </Button>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
        )}
      />
    </React.Fragment>
  );
};

export default JarjestamislupaAsiaListItem;
