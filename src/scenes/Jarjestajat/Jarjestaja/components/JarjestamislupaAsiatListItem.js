import React from "react";
import styled from "styled-components";
import Media from "react-media";
import { Td, Trn } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
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
    uuid
  } = props.muutospyynto;

  return (
    <React.Fragment>
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Trn>
            <Td>
              <LupaText>
                <TextPartial>
                  {LUPA_TEKSTIT.MUUTOSPYYNTO.MUUTOS.FI}
                </TextPartial>
                <TextPartial>
                  {LUPA_TEKSTIT.ASIAT.ASIAT_TAULUKKO.TILA.FI}:&nbsp;
                  {LUPA_TEKSTIT.MUUTOSPYYNTO.TILA[tila].FI}
                </TextPartial>
              </LupaText>
              <LupaText>
                <NavLink
                  to={`${props.url}/hakemukset-ja-paatokset/${uuid}/1`}
                  exact={true}>
                  <Button title="Täydennä hakemusta">
                    <Edit/>
                  </Button>
                </NavLink>
              </LupaText>
            </Td>
          </Trn>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <Trn>
            {/*TODO: When asiakirjat table contains real data <Tr onClick={e => open(e, "todo")}>*/}
            <Td size="small">
              <Typography component="span">{}</Typography>
            </Td>
            <Td size="small">
              <Typography component="span">
                {LUPA_TEKSTIT.MUUTOSPYYNTO.MUUTOS.FI}
              </Typography>
            </Td>
            <Td size="small">
              <Typography component="span">
                {LUPA_TEKSTIT.MUUTOSPYYNTO.TILA[tila].FI}
              </Typography>
            </Td>
            <Td size="small">
              <Typography component="span" noWrap={true}>
              </Typography>
            </Td>
            <Td size="small">
              <Typography component="span" noWrap={true}>
              </Typography>
            </Td>
            <Td size="small">
              <div className="flex">
                <NavLink
                  to={`${props.url}/hakemukset-ja-paatokset/${uuid}/1`}
                  exact={true}>
                  <Button title="Täydennä hakemusta">
                    <Edit />
                  </Button>
                </NavLink>
              </div>
            </Td>
          </Trn>
        )}
      />
    </React.Fragment>
  );
};

export default JarjestamislupaAsiaListItem;
