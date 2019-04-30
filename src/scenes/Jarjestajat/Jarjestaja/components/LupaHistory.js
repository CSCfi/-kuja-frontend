import _ from "lodash";
import React, { useContext, useEffect } from "react";
import Media from "react-media";
import styled from "styled-components";
import { Table, Thead, Tbody, Thn, Trn } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../modules/constants";
import LupaHistoryItem from "./LupaHistoryItem";
import Loading from "../../../../modules/Loading";
import { fetchLupaHistory } from "services/lupahistoria/actions";
import { LupahistoriaContext } from "context/lupahistoriaContext";

const WrapTable = styled.div``;

const LupaHistory = props => {
  const { jarjestajaOid } = props;
  const { state: lupaHistory, dispatch } = useContext(LupahistoriaContext);

  useEffect(() => {
    if (jarjestajaOid) {
      fetchLupaHistory(jarjestajaOid)(dispatch);
    }
  }, [jarjestajaOid]);

  const { fetched, isFetching, hasErrored, data } = lupaHistory;
  
  const renderLupaHistoryList = data => {
    data = _.orderBy(data, ["paatospvm"], ["desc"]);
    return _.map(data, (historyData, index) => (
      <LupaHistoryItem
        lupaHistoria={historyData}
        key={`${historyData.diaarinumero}-${index}`}
      />
    ));
  };

  if (fetched) {
    return (
      <WrapTable>
        <Media
          query={MEDIA_QUERIES.MOBILE}
          render={() => (
            <Table>
              <Tbody>{renderLupaHistoryList(data)}</Tbody>
            </Table>
          )}
        />
        <Media
          query={MEDIA_QUERIES.TABLET_MIN}
          render={() => (
            <Table>
              <Thead>
                <Trn>
                  <Thn>
                    {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.DIAARINUMERO.FI}
                  </Thn>
                  <Thn>
                    {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.PAATOSPVM.FI}
                  </Thn>
                  <Thn>
                    {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.VOIMAANTULOPVM.FI}
                  </Thn>
                  <Thn>
                    {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.PAATTAMISPVM.FI}
                  </Thn>
                  <Thn>
                    {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.KUMOTTU.FI}
                  </Thn>
                </Trn>
              </Thead>
              <Tbody>{renderLupaHistoryList(data)}</Tbody>
            </Table>
          )}
        />
      </WrapTable>
    );
  } else if (isFetching) {
    return <Loading />;
  } else if (hasErrored) {
    return <h2>{LUPA_TEKSTIT.PAATOKSET.VIRHE.FI}</h2>;
  } else {
    return null;
  }
};

export default LupaHistory;
