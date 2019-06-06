import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinkItemUpper from "../../../scenes/Header/components/LinkItemUpper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { getOrganization } from "services/kayttajat/actions";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MEDIA_QUERIES } from "../../../modules/styles";
import SideNavigation from "../SideNavigation";
import { NavLink } from "react-router-dom";
import { COLORS } from "../../../modules/styles";
import { defineMessages, injectIntl } from "react-intl";
import { AppContext } from "../../../context/appContext";
import { setLocale } from "../../../services/app/actions";
import css from "./button-app-bar.module.css";

const styles = () => ({
  appBar: {
    position: "relative",
    backgroundColor: COLORS.WHITE,
    opacity: 0.98,
    marginLeft: -8
  },
  menuButton: {
    marginLeft: -4,
    marginRight: 4
  }
});

const messages = defineMessages({
  logIn: {
    id: "auth.logIn",
    defaultMessage: "Kirjaudu sisään"
  },
  logOut: {
    id: "auth.logOut",
    defaultMessage: "Kirjaudu ulos"
  },
  inFinnish: {
    id: "languages.inFinnish",
    defaultMessage: "Suomeksi"
  },
  inSwedish: {
    id: "languages.inSwedish",
    defaultMessage: "Ruotsiksi"
  }
});

const ButtonAppBar = ({
  classes,
  ytunnus,
  user = {},
  oppilaitos,
  pageLinks,
  dispatch,
  ...props
}) => {
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);
  const [state, setState] = useState({
    isSideNavigationVisible: false
  });

  const {
    intl: { formatMessage }
  } = props;

  useEffect(() => {
    if (user && user.oid) {
      getOrganization(user.oid)(dispatch);
    }
  }, [user, dispatch]);

  const handleMenuButtonClick = () => {
    setState({
      isSideNavigationVisible: !state.isSideNavigationVisible
    });
  };

  const handleLocaleChange = (event, locale) => {
    setLocale(locale)(appDispatch);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <SideNavigation
        user={user}
        oppilaitos={oppilaitos}
        ytunnus={ytunnus}
        position="left"
        shouldBeVisible={state.isSideNavigationVisible}
        onDrawerToggle={handleMenuButtonClick}
        pageLinks={pageLinks}
      />
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar className="flex">
          {!breakpointTabletMin && (
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={handleMenuButtonClick}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div className="flex-1 mt-1">
            <NavLink
              to="/"
              exact
              className="inline-block no-underline text-gray-800"
            >
              <Typography variant="h6" color="inherit" noWrap>
                Oiva
              </Typography>
              <Typography variant="subtitle2" color="inherit" noWrap>
                Opetushallinnon ohjaus- ja säätelypalvelu
              </Typography>
            </NavLink>
          </div>
          {breakpointTabletMin && !sessionStorage.getItem("role") ? (
            <LinkItemUpper
              to="/cas-auth"
              className="has-separator pull-right"
              activeStyle={{
                backgroundColor: "transparent"
              }}
            >
              {formatMessage(messages.logIn)}
            </LinkItemUpper>
          ) : null}
          {breakpointTabletMin && user && user.username && (
            <LinkItemUpper
              to="/cas-logout"
              className="has-separator pull-right"
              activeStyle={{
                backgroundColor: "transparent"
              }}
            >
              {formatMessage(messages.logOut)} ({user.username})
            </LinkItemUpper>
          )}
          {breakpointTabletMin && (
            <React.Fragment>
              <ToggleButtonGroup
                size="small"
                onChange={handleLocaleChange}
                value={appState.locale}
                exclusive
              >
                <ToggleButton
                  key={1}
                  value="fi"
                  classes={{
                    label: css["locale-label"],
                    selected: css["locale-selected"],
                    sizeSmall: css["locale-button"]
                  }}
                >
                  {formatMessage(messages.inFinnish)}
                </ToggleButton>
                <ToggleButton
                  key={2}
                  value="sv"
                  classes={{
                    label: css["locale-label"],
                    selected: css["locale-selected"],
                    sizeSmall: css["locale-button"]
                  }}
                >
                  {formatMessage(messages.inSwedish)}
                </ToggleButton>
              </ToggleButtonGroup>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(ButtonAppBar));
