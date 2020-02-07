import React, {useEffect, useState} from "react";
import * as R from "ramda";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {Helmet} from "react-helmet";

import common from "../../../i18n/definitions/common";
import {useIntl} from "react-intl";
import Table from "okm-frontend-components/dist/components/02-organisms/Table"
import SearchFilter from "okm-frontend-components/dist/components/02-organisms/SearchFilter"
import {useLuvat} from "../../../stores/luvat";
import {generateVSTTableStructure} from "../modules/utils";
import {useVSTTyypit} from "../../../stores/vsttyypit";
const VapaaSivistystyo = ({history}) => {
  const intl = useIntl();
  const [luvatRaw, luvatActions] = useLuvat();
  const [vstRaw, vstActions] = useVSTTyypit();
  const [luvat, setLuvat] = useState([]);
  const [vstMap, setvstMap] = useState({
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5'
  });

  const [searchFilter, updateSearchFilter] = useState("");

  useEffect(() => {
    const queryParameters = [{
      key: 'koulutustyyppi',
      value: '3'
    }];
    const abortController = luvatActions.load(queryParameters);
    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [luvatActions]);

  useEffect(() => {
    const abortController = vstActions.load();
    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    }
  }, [vstActions])

  useEffect(() => {
    if (luvatRaw.data) {
      if(searchFilter.length > 0) {
        setLuvat(
          luvatRaw.data.filter(
            lupa => {
              const nimi = R.path(["jarjestaja", "nimi", "fi"])(lupa);
              if (nimi) {
                return nimi.includes(searchFilter);
              } else return false;
            }
          )
        )
      }
      else {
        setLuvat(luvatRaw.data);
      }
    }
  }, [luvatRaw, searchFilter]);

  useEffect(() => {
    if(vstRaw.data) {
      const vst = {};
      vstRaw.data.forEach(item => {
        vst[item.koodiArvo] = R.path(["nimi"], R.find(metadata => metadata.kieli === "FI", item.metadata));
      });
      setvstMap(vst);
    }
  }, [vstRaw])

  const tableStructure = generateVSTTableStructure(luvat, intl, vstMap);

  // TODO: SearchFilter's container needs to be styled properly
  return (
    <React.Fragment>
      <Helmet>
        <title>Kuja | Vapaa sivistystyö</title>
      </Helmet>
      <BreadcrumbsItem to="/">{intl.formatMessage(common.frontpage)}</BreadcrumbsItem>
      <BreadcrumbsItem to="/vapaa-sivistystyo">{intl.formatMessage(common.vst.titleName)}</BreadcrumbsItem>
      <div className="mx-auto w-full sm:w-3/4 mb-16">
      <h1>{intl.formatMessage(common.vst.jarjestajatHeading)}</h1>
        <div className="my-4">
          {intl.formatMessage(common.activeLuvatCount, {count: luvat.length})}
        </div>

        <div className="flex w-1/2">
          <SearchFilter onValueChanged={updateSearchFilter} placeholder={intl.formatMessage(common.searchByJarjestaja)}/>
        </div>

        <Table structure={tableStructure}/>
      </div>
    </React.Fragment>
  );
};

export default VapaaSivistystyo;
