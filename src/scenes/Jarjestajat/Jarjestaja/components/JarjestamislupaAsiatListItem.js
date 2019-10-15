import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import Media from "react-media";
import { Tr } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

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
    tila,
    voimassaalkupvm,
    voimassaloppupvm,
    uuid
  } = props.muutospyynto;

  const open = (e, nro) => {
    e.stopPropagation();
    props.setOpened(nro);
  };

  return (
    <React.Fragment>
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Tr>
            <LupaText>
              <TextPartial>
                {/*{LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.DNRO.FI}: OKM/{diaarinumero}*/}
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.ASIA.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">{voimassaalkupvm}</Moment>
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.MAARAAIKA.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">{voimassaloppupvm}</Moment>
              </TextPartial>
              <TextPartial>
                {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.PAATETTY.FI}:&nbsp;
                <Moment format="DD.MM.YYYY">onko?</Moment>
              </TextPartial>
            </LupaText>
          </Tr>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <TableRow onClick={e => open(e, "todo")} hover className="cursor-pointer">
            <TableCell size="small">
              <Typography component="span">{}</Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span">
                Järjestämisluvan muutos
              </Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span">
                {tila}
              </Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span" noWrap={true}>
                <Moment format="DD.MM.YYYY">{/*  TODO: */}</Moment>
              </Typography>
            </TableCell>
            <TableCell size="small">
              <Typography component="span" noWrap={true}>
                <Moment format="DD.MM.YYYY">{/*  TODO: */}</Moment>
              </Typography>
            </TableCell>
            <TableCell size="small">
              <div className="flex">
                <NavLink
                  to={`${props.baseurl}/hakemukset-ja-paatokset/${uuid}/1`}
                  exact={true}>
                  <Button title="Täydennä hakemusta">
                    <Edit />
                  </Button>
                </NavLink>
              </div>
            </TableCell>
          </TableRow>
        )}
      />
    </React.Fragment>
  );
};

export default JarjestamislupaAsiaListItem;
