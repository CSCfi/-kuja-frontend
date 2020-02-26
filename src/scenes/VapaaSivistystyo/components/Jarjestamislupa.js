import React from "react";
import styled from "styled-components";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { COLORS } from "../../../modules/styles";
import PropTypes from "prop-types";
import common from "../../../i18n/definitions/common";
import {useIntl} from "react-intl";
import {LUPA_SECTIONS} from "../modules/constants";
import LupaSection from "./LupaSection";

const TopSectionWrapper = styled.div`
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
`;

const InnerContentContainer = styled.div`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.BORDER_GRAY};
  box-shadow: 0 2px 4px 3px rgba(219, 219, 219, 0.2);
`;

const getTyyppiMessage = (lupa) => {
  const koulutustyyppi = lupa.koulutustyyppi;
  const vstTyyppi = lupa.oppilaitostyyppi;

  if(!koulutustyyppi) {
    return common.lupaPageTitleAmmatillinen;
  }

  switch(koulutustyyppi) {
    case "1":
      return common.lupaPageTitleEsiJaPerusopeutus;
    case "2":
      return common.lupaPageTitleLukio;
    case "3":
      switch(vstTyyppi) {
        case "1":
          return common.lupaPageTitleVSTKansanopisto;
        case "2":
          return common.lupaPageTitleVSTKansalaisopisto;
        case "3":
          return common.lupaPageTitleVSTOpintokeskus;
        case "4":
          return common.lupaPageTitleVSTKesayliopisto;
        case "5":
          return common.lupaPageTitleVSTLiikunnanKoulutuskeskus;
        case "6":
          return common.lupaPageTitleVSTMuut;
      }
  }
};

const Jarjestamislupa = React.memo(({ lupaKohteet, lupa }) => {
  const intl = useIntl();
  const titleMessageKey = getTyyppiMessage(lupa);
  const dateString = new moment().format('D.M.YYYY');
  return (
    <InnerContentContainer>
      <div>
        <TopSectionWrapper className="p-8">
            <Typography component="h1" variant="h5">
              {intl.formatMessage(titleMessageKey, {date: dateString})}
            </Typography>
          </TopSectionWrapper>

        <div className="p-8">
          {Object.keys(LUPA_SECTIONS).map((k, i) => (
            <LupaSection
              key={i}
              kohde={lupaKohteet[k]}
              ytunnus={lupa.jarjestajaYtunnus}
            />
          ))}
        </div>
      </div>
    </InnerContentContainer>
  );
});

Jarjestamislupa.propTypes = {
  lupaKohteet: PropTypes.object,
  lupa: PropTypes.object
};

export default Jarjestamislupa;
