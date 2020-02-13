import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Helmet } from "react-helmet";

import common from "../../../i18n/definitions/common";
import { useIntl } from "react-intl";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import SearchFilter from "okm-frontend-components/dist/components/02-organisms/SearchFilter";
import Dropdown from "okm-frontend-components/dist/components/00-atoms/Dropdown";
import { useLuvat } from "../../../stores/luvat";
import { generateVSTTableStructure } from "../modules/utils";
import { useVSTTyypit } from "../../../stores/vsttyypit";
const VapaaSivistystyo = ({ history }) => {
  const intl = useIntl();
  const [luvatRaw, luvatActions] = useLuvat();
  const [vstRaw, vstActions] = useVSTTyypit();
  const [luvat, setLuvat] = useState([]);
  const [vstMap, setvstMap] = useState({
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6"
  });
  const [vstTypeOptions, setvstTypeOptions] = useState([]);
  const [searchFilter, updateSearchFilter] = useState("");
  const [vstTypeSelection, setvstTypeSelection] = useState(null);
  const [allDataLength, setAllDataLength] = useState(0);
  const [filteredDataLength, setFilteredDataLength] = useState(0);

  useEffect(() => {
    const queryParameters = [
      {
        key: "koulutustyyppi",
        value: "3"
      }
    ];
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
    };
  }, [vstActions]);

  useEffect(() => {
    if (luvatRaw.data) {
      let filteredLuvat = luvatRaw.data;
      if (searchFilter.length > 0) {
        filteredLuvat = filteredLuvat.filter(lupa => {
          const nimi = R.path(["jarjestaja", "nimi", "fi"])(lupa);
          if (nimi) {
            return nimi.includes(searchFilter);
          } else {
            return false;
          }
        });
      }
      if (vstTypeSelection) {
        filteredLuvat = filteredLuvat.filter(
          lupa => lupa.oppilaitostyyppi === vstTypeSelection
        );
      }
      setLuvat(filteredLuvat);
      setAllDataLength(luvatRaw.data.length);
      setFilteredDataLength(filteredLuvat.length);
    }
  }, [luvatRaw, searchFilter, vstTypeSelection]);

  useEffect(() => {
    if (vstRaw.data) {
      const vst = {};
      const vstOptions = [];
      vstRaw.data.forEach(item => {
        const name = R.path(
          ["nimi"],
          R.find(metadata => metadata.kieli === "FI", item.metadata)
        );
        vst[item.koodiArvo] = name;
        vstOptions.push({ value: item.koodiArvo, label: name });
      });
      setvstMap(vst);
      setvstTypeOptions(vstOptions);
    }
  }, [vstRaw]);

  const tableStructure = generateVSTTableStructure(luvat, intl, vstMap);
  const onTypeSelectionChange = selection => {
    if (selection) {
      setvstTypeSelection(selection.value);
    } else {
      setvstTypeSelection(null);
    }
  };
  const vstTypeSelectionPlaceholder = intl.formatMessage(
    common.filterByOppilaitostyyppi
  );

  // TODO: SearchFilter's container needs to be styled properly
  return (
    <React.Fragment>
      <Helmet>
        <title>Kuja | Vapaa sivistystyö</title>
      </Helmet>
      <BreadcrumbsItem to="/">
        {intl.formatMessage(common.frontpage)}
      </BreadcrumbsItem>
      <BreadcrumbsItem to="/vapaa-sivistystyo">
        {intl.formatMessage(common.vst.titleName)}
      </BreadcrumbsItem>
      <div className="mx-2 lg:mx-auto w-full sm:w-3/4 mb-16">
        <h1>{intl.formatMessage(common.vst.jarjestajatHeading)}</h1>
        <div className="my-4">
          {intl.formatMessage(common.activeLuvatCount, {
            count: allDataLength
          })}
        </div>

        <div className="flex flex-col lg:flex-row mb-4">
          <div className="lg:mr-4 h-13">
            <SearchFilter
              onValueChanged={updateSearchFilter}
              placeholder={intl.formatMessage(common.searchByJarjestaja)}
            />
          </div>
          <div className="mt-2 lg:mt-0 lg:mr-2 h-13">
            <Dropdown
              onChanges={onTypeSelectionChange}
              isClearable={true}
              options={vstTypeOptions}
              placeholder={vstTypeSelectionPlaceholder}
              isTall={true}
              className="w-full lg:w-20"
            />
          </div>
          <div className="mt-2 lg:ml-4 lg:my-auto">
            {intl.formatMessage(common.displayingPortion, {
              selectedCount: filteredDataLength,
              allCount: allDataLength
            })}
          </div>
        </div>

        <Table structure={tableStructure} />
      </div>
    </React.Fragment>
  );
};

export default VapaaSivistystyo;
