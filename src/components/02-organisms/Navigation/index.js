import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import LinkItem from "../../../scenes/Header/components/LinkItem";
import { COLORS } from "modules/styles";
import { ROLE_ESITTELIJA } from "modules/constants";
import { injectIntl } from "react-intl";
import userMessages from "../../../i18n/definitions/user";

import styles from "./navigation.module.css";

const HeaderBarLower = styled.div`
  display: flex;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  margin: 0 auto;
  width: 100%;
  background: ${COLORS.OIVA_MENU_BG_COLOR};
  max-height: 50px;
`;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    // backgroundColor: theme.palette.background.paper,
  }
}));

const Navigation = props => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="navigation">
      <AppBar position="static">
        <HeaderBarLower className="text-xs lg:text-base">
          {/* TODO: localization! */}
          {props.pageLinks.map(link => (
            <LinkItem
              to={link.path}
              className={`${
                styles["navigation-item"]
              } px-2 sm:px-4 py-4 no-underline`}
              key={link.text}
              exact={link.isExact}
            >
              {link.text}
            </LinkItem>
          ))}
          {props.ytunnus && (
            <LinkItem
              className={`${
                styles["navigation-item"]
              } px-2 sm:px-4 py-4 no-underline`}
              ytunnus={props.ytunnus}
              to={{
                pathname: "/jarjestajat/" + props.ytunnus + "/omattiedot",
                ytunnus: props.ytunnus
              }}
              exact
            >
              {props.intl.formatMessage(userMessages.ownOrganization)}
            </LinkItem>
          )}

          {sessionStorage.getItem("role") === ROLE_ESITTELIJA ? (
            <LinkItem to="/asiat">Asiat</LinkItem>
          ) : null}
        </HeaderBarLower>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  ytunnus: PropTypes.string
};

export default injectIntl(Navigation);
