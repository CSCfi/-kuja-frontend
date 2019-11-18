import React, { useContext, useMemo } from "react";
import Media from "react-media";
import styled from "styled-components";
import { Table, Thead, Tbody, Thn, Trn } from "../../../../modules/Table";
import { MEDIA_QUERIES } from "../../../../modules/styles";
import { LUPA_TEKSTIT } from "../modules/constants";
import LupaHistoryItem from "./LupaHistoryItem";
import FetchHandler from "../../../../FetchHandler";
import { BackendContext } from "../../../../context/backendContext";
import * as R from "ramda";
import _ from "lodash";

const WrapTable = styled.div``;

const LupaHistory = props => {
  const { jarjestajaOid } = props;
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    return jarjestajaOid
      ? [
          {
            key: "lupahistoria",
            dispatchFn: dispatch,
            urlEnding: jarjestajaOid
          }
        ]
      : [];
  }, [jarjestajaOid, dispatch]);

  const data = useMemo(() => {
    return R.prop("raw", fromBackend.lupahistoria) || [];
  }, [fromBackend.lupahistoria]);

  const renderLupaHistoryList = data => {
    data = _.orderBy(data, ["paatospvm"], ["desc"]);
    return _.map(data, (historyData, index) => (
      <LupaHistoryItem
        lupaHistoria={historyData}
        key={`${historyData.diaarinumero}-${index}`}
      />
    ));
  };

  return (
    <FetchHandler
      fetchSetup={fetchSetup}
      ready={
        <WrapTable>
          <Media
            query={MEDIA_QUERIES.MOBILE}
            render={() => (
              <Table role="table">
                <Tbody role="rowgroup">{renderLupaHistoryList(data)}</Tbody>
              </Table>
            )}
          />
          <Media
            query={MEDIA_QUERIES.TABLET_MIN}
            render={() => (
              <Table role="table">
                <Thead role="rowgroup">
                  <Trn role="row">
                    <Thn role="columnheader">
                      {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.DIAARINUMERO.FI}
                    </Thn>
                    <Thn role="columnheader">
                      {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.PAATOSPVM.FI}
                    </Thn>
                    <Thn>
                      {
                        LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.VOIMAANTULOPVM
                          .FI
                      }
                    </Thn>
                    <Thn role="columnheader">
                      {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.PAATTAMISPVM.FI}
                    </Thn>
                    <Thn role="columnheader">
                      {LUPA_TEKSTIT.PAATOKSET.HISTORIA_TAULUKKO.KUMOTTU.FI}
                    </Thn>
                  </Trn>
                </Thead>
                <Tbody role="rowgroup">{renderLupaHistoryList(data)}</Tbody>
              </Table>
            )}
          />
        </WrapTable>
      }
      erroneous={<h2>{LUPA_TEKSTIT.PAATOKSET.VIRHE.FI}</h2>}
    ></FetchHandler>
  );
};

export default LupaHistory;
