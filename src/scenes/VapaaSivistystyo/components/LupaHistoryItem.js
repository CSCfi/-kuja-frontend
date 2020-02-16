import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import Media from "react-media";

import { MEDIA_QUERIES } from "../../../modules/styles";

import { API_BASE_URL } from "../../../modules/constants";
import { Td, Tr } from "../../../modules/Table";

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

const LupaHistoryItem = props => {
  const {
    filename,
    diaarinumero,
    voimassaoloalkupvm,
    voimassaololoppupvm,
    paatospvm
  } = props.lupaHistoria;

  let path = "/pebble/resources/liitteet/lupahistoria/";
  if (voimassaololoppupvm.split("-").join("") > "20181230") {
    path = "/pdf/";
  }

  return (
    <a
      href={`${API_BASE_URL}${path}${filename}`}
      target="_blank"
      rel="noopener noreferrer">
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Tr role="row">
            <LupaText>
              <TextPartial>Diaarinumero: {diaarinumero}</TextPartial>
              <TextPartial>
                Päätös tehty:&nbsp;
                <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
              </TextPartial>
              {voimassaoloalkupvm === "2018-01-01" &&
              voimassaololoppupvm === "2018-01-01" ? (
                <TextPartial>
                  Kumottu:{" "}
                  <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
                </TextPartial>
              ) : (
                <TextPartial>
                  Voimassa:&nbsp;
                  <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
                  &nbsp;-&nbsp;
                  <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
                </TextPartial>
              )}
            </LupaText>
          </Tr>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <div>
            {voimassaoloalkupvm === voimassaololoppupvm ? (
              <Tr role="row">
                <Td role="cell">{diaarinumero}</Td>
                <Td role="cell">
                  <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
                </Td>
                <Td role="cell"></Td>
                <Td role="cell"></Td>
                <Td role="cell">
                  <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
                </Td>
              </Tr>
            ) : (
              <Tr role="row">
                <Td role="cell">{diaarinumero}</Td>
                <Td role="cell">
                  <Moment format="DD.MM.YYYY">{paatospvm}</Moment>
                </Td>
                <Td role="cell">
                  <Moment format="DD.MM.YYYY">{voimassaoloalkupvm}</Moment>
                </Td>
                <Td role="cell">
                  <Moment format="DD.MM.YYYY">{voimassaololoppupvm}</Moment>
                </Td>
                <Td role="cell"></Td>
              </Tr>
            )}
          </div>
        )}
      />
    </a>
  );
};

export default LupaHistoryItem;
