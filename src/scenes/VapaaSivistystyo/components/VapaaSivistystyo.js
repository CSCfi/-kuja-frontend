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
const VapaaSivistystyo = ({history}) => {
  const intl = useIntl();
  const [luvat, luvatActions] = useLuvat();
  const [luvatData, setLuvatData] = useState([]);
  const [searchFilter, updateSearchFilter] = useState("");

  // Let's fetch LUVAT
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
    if (luvat.data) {
      if(searchFilter.length > 0) {
        setLuvatData(
          luvat.data.filter(
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
        setLuvatData(luvat.data);
      }
    }
  }, [luvat, searchFilter]);

  const tableStructure = generateVSTTableStructure(luvatData, intl);

  return (
    <React.Fragment>
      <Helmet>
        <title>Kuja | Vapaa sivistystyö</title>
      </Helmet>
      <BreadcrumbsItem to="/">{intl.formatMessage(common.frontpage)}</BreadcrumbsItem>
      <BreadcrumbsItem to="/vapaa-sivistystyo">{intl.formatMessage(common.vst.titleName)}</BreadcrumbsItem>
      <div className="mx-auto w-full sm:w-3/4 mb-16">
      <h1>{intl.formatMessage(common.vst.jarjestajatHeading)}</h1>
        <p className="my-4">
          {intl.formatMessage(common.activeLuvatCount, {count: luvatData.length})}
        </p>

        <p className="flex w-1/2">
          <SearchFilter onValueChanged={updateSearchFilter} placeholder={intl.formatMessage(common.searchByJarjestaja)}/>
        </p>

        <Table structure={tableStructure}/>
      </div>
    </React.Fragment>
  );
};

export default VapaaSivistystyo;
