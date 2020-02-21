import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import LupaSection from "./LupaSection";
import Typography from "@material-ui/core/Typography";
import { LUPA_SECTIONS } from "../modules/constants";
import { COLORS } from "../../../modules/styles";
import PropTypes from "prop-types";

const TopSectionWrapper = styled.div`
  border-bottom: 1px solid ${COLORS.BORDER_GRAY};
`;

const InnerContentContainer = styled.div`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.BORDER_GRAY};
  box-shadow: 0 2px 4px 3px rgba(219, 219, 219, 0.2);
`;

const Jarjestamislupa = React.memo(({ lupaKohteet, lupa }) => {
  return (
    <InnerContentContainer>
      <div>
        <TopSectionWrapper className="p-8">
            <Typography component="h1" variant="h5">
              {'LOKALISOI Ajantasainen ammatillisten tutkintojen ja koulutuksen järjestämislupa'} <Moment format="DD.MM.YYYY" />
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
