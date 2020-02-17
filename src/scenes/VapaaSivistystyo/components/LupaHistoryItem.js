import React from "react";
import {useIntl} from "react-intl";
import moment from 'moment';
import styled from "styled-components";
import Media from "react-media";

import { MEDIA_QUERIES } from "../../../modules/styles";

import { API_BASE_URL } from "../../../modules/constants";
import { Td, Tr } from "../../../modules/Table";
import common from "../../../i18n/definitions/common";

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

  const intl = useIntl();

  const voimassaoloalkupvmFormatted = (new moment(voimassaoloalkupvm,'YYYY-MM-DD')).format('D.M.YYYY');
  const voimassaololoppupvmFormatted = (new moment(voimassaololoppupvm,'YYYY-MM-DD')).format('D.M.YYYY');
  const paatospvmFormatted = (new moment(paatospvm,'YYYY-MM-DD')).format('D.M.YYYY');

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
              <TextPartial>{intl.formatMessage(common.diaarinumero)}: {diaarinumero}</TextPartial>
              <TextPartial>
                {intl.formatMessage(common.lupaHistoriaPaatosDateMobile, {
                  date: paatospvmFormatted
                })}
              </TextPartial>
              {
                voimassaoloalkupvm === voimassaololoppupvm ? (
                <TextPartial>
                  {intl.formatMessage(common.lupaHistoriaKumottuDateMobile, {
                    date: voimassaololoppupvm
                  })}
                </TextPartial>
              ) : (
                <TextPartial>
                  {intl.formatMessage(common.lupaHistoriaValidDateRangeMobile, {
                    date1: voimassaoloalkupvmFormatted,
                    date2: voimassaololoppupvmFormatted
                  })}
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
                <Td role="cell">{paatospvmFormatted}</Td>
                <Td role="cell"></Td>
                <Td role="cell"></Td>
                <Td role="cell">{voimassaololoppupvmFormatted}</Td>
              </Tr>
            ) : (
              <Tr role="row">
                <Td role="cell">{diaarinumero}</Td>
                <Td role="cell">{paatospvmFormatted}</Td>
                <Td role="cell">{voimassaoloalkupvmFormatted}</Td>
                <Td role="cell">{voimassaololoppupvmFormatted}</Td>
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
