import _ from "lodash";
import React, { useState } from "react";
import Media from "react-media";
import styled from "styled-components";
import {
  Table,
  Thead,
  Tbody,
  Thn,
  Trn,
  ThButton
} from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../../../Jarjestajat/Jarjestaja/modules/constants";
import JarjestamislupaAsiakirjatItem from "./JarjestamislupaAsiakirjatItem";

const WrapTable = styled.div``;
const JarjestamislupaAsiakirjat = ({ lupaHistory }) => {
  const [state, setState] = useState({
    opened: 0
  });

  const setOpened = dnro => {
    setState({ opened: dnro });
  };

  const renderJarjestamislupaAsiatList = data => {
    data = _.orderBy(lupaHistory, ["paatospvm", "uuid"], ["desc", "desc"]);
    return _.map(data, historyData => (
      <JarjestamislupaAsiakirjatItem
        lupaHistoria={historyData}
        key={historyData.diaarinumero}
        setOpened={setOpened}
      />
    ));
  };

  return (
    <WrapTable>
      <Media
        query={MEDIA_QUERIES.MOBILE}
        render={() => (
          <Table>
            <Tbody>{this.renderJarjestamislupaAsiatList(lupaHistory)}</Tbody>
          </Table>
        )}
      />
      <Media
        query={MEDIA_QUERIES.TABLET_MIN}
        render={() => (
          <Table>
            <Thead>
              <Trn>
                <Thn flex="2">
                  {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.ASIAKIRJA.FI}
                </Thn>
                <Thn flex="2">
                  {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.TILA.FI}
                </Thn>
                <Thn flex="3">
                  {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.LAATIJA.FI}
                </Thn>
                <Thn flex="2">
                  {LUPA_TEKSTIT.ASIAT.ASIATKIRJAT_TAULUKKO.VALMIS.FI}
                </Thn>
                <ThButton></ThButton>
                <ThButton></ThButton>
              </Trn>
            </Thead>
            <Tbody>{this.renderJarjestamislupaAsiatList(lupaHistory)}</Tbody>
          </Table>
        )}
      />
    </WrapTable>
  );
};

export default JarjestamislupaAsiakirjat;
