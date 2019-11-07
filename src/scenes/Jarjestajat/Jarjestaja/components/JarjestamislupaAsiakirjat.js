import * as R from "ramda";
import React from "react";
import Media from "react-media";
import styled from "styled-components";
import { Table, Tbody, Thead, Thn, Trn } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import JarjestamislupaAsiakirjatItem from "./JarjestamislupaAsiakirjatItem";
import { Typography } from "@material-ui/core";
import common from "../../../../i18n/definitions/common";
import PropTypes from "prop-types";

const WrapTable = styled.div``;

const titleKeys = [
  common.document,
  common.documentStatus,
  common.author
];

const JarjestamislupaAsiakirjat = ({muutospyynto, asiakirjat, organisaatio, intl}) => {

  const baseRow = [
    LUPA_TEKSTIT.MUUTOSPYYNTO.TILA[muutospyynto.tila][R.toUpper(intl.locale)],
    R.path(["nimi", intl.locale], organisaatio)
  ];

  const getLiitteetRowItems = R.map((liite) =>
    ({
      items: R.prepend(
        intl.formatMessage(liite.salainen ? common.secretAttachment : common.attachment) + " " + R.prop("nimi", liite),
        baseRow),
      fileLink: `/api/liitteet/${liite.uuid}/raw`
    }), asiakirjat);

  const getMuutospyyntoRowItems = {
    fileLink: `/api/pdf/esikatsele/muutospyynto/${muutospyynto.uuid}`,
    items: R.prepend(
      intl.formatMessage(common.application),
      baseRow)
  };

  const jarjestamislupaAsiakirjatList = () => {
    return R.addIndex(R.map)((row, idx) => (
      <a href={row.fileLink} target="_blank" rel="noopener noreferrer">
        <JarjestamislupaAsiakirjatItem
          rowItems = { row.items }
          key = { idx }
        />
      </a>
    ), R.prepend(getMuutospyyntoRowItems, getLiitteetRowItems));
  };

  return (
    <WrapTable>
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Table>
            <Tbody>{jarjestamislupaAsiakirjatList()}</Tbody>
          </Table>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <Table>
            <Thead>
              <Trn>
                {
                  titleKeys.map((title, ind) => (
                    <Thn key={ind}>
                      <Typography>{ intl.formatMessage(title) }</Typography>
                    </Thn>)
                  )
                }
              </Trn>
            </Thead>
            <Tbody>{jarjestamislupaAsiakirjatList()}</Tbody>
          </Table>
        )}
      />
    </WrapTable>
  );
};

JarjestamislupaAsiakirjat.propTypes = {
  match: PropTypes.object,
  muutospyynto: PropTypes.object,
  organisaatio: PropTypes.object,
  intl: PropTypes.object
};

export default JarjestamislupaAsiakirjat;
