import React from "react";
import PropTypes from "prop-types";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import css from "./header.module.css";
import TemplateA from "../../03-templates/TemplateA";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const MEDIA_QUERIES = {
  MOBILE: "only screen and (min-width: 360px) and (max-width: 767px)",
  TABLET: "only screen and (min-width: 768px) and (max-width: 1023px)",
  TABLET_MIN: "only screen and (min-width: 768px)",
  DESKTOP_NORMAL: "only screen and (min-width: 1024px) and (max-width: 1279px)",
  DESKTOP_LARGE: "only screen and (min-width: 1280px)"
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = ({
  inFinnish,
  inSwedish,
  isLoggedIn,
  locale,
  logIn,
  logo,
  logoutLink,
  onLocaleChange,
  onMenuClick,
  organisation,
  shortDescription
}) => {
  const classes = useStyles();

  const items = [
    <Router>
      <NavLink
        to={logo.path}
        exact={true}
        className="inline-block no-underline text-gray-800">
        <Typography variant="h4">{logo.text}</Typography>
      </NavLink>
    </Router>,
    <Router>
      <NavLink
        to={shortDescription.path}
        exact={true}
        className="inline-block no-underline text-gray-800">
        {shortDescription.text}
      </NavLink>
    </Router>,
    <Router>
      <NavLink
        to={logoutLink.path}
        exact={true}
        className="inline-block no-underline text-gray-800 hover:underline">
        <span>{logoutLink.text[0]}: </span>
        <span className="font-bold">{logoutLink.text[1]}</span>
      </NavLink>
    </Router>,
    <span className="text-gray-600">{organisation.text}</span>
  ];

  const breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);

  return (
    <React.Fragment>
      {/* Layout for mobile and other small screens */}
      {!breakpointTabletMin && (
        <div className={classes.root}>
          <AppBar elevation={0} position="static">
            <Toolbar className="bg-green-500">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {logo.text}
              </Typography>
              {!isLoggedIn && <Button color="inherit">{logIn}</Button>}
            </Toolbar>
          </AppBar>
        </div>
      )}
      {/* Layout for bigger screens */}
      {breakpointTabletMin && (
        <AppBar elevation={0} position="static">
          <Toolbar className="bg-white px-4 border border-gray-300">
            <TemplateA items={items}>
              <ToggleButtonGroup
                size="small"
                onChange={onLocaleChange}
                value={locale}
                exclusive>
                <ToggleButton
                  key={1}
                  value="fi"
                  className="whitespace-no-wrap"
                  classes={{
                    label: css["locale-label"],
                    selected: css["locale-selected"],
                    sizeSmall: css["locale-button"]
                  }}>
                  {inFinnish}
                </ToggleButton>
                <ToggleButton
                  key={2}
                  value="sv"
                  className="whitespace-no-wrap"
                  classes={{
                    label: css["locale-label"],
                    selected: css["locale-selected"],
                    sizeSmall: css["locale-button"]
                  }}>
                  {inSwedish}
                </ToggleButton>
              </ToggleButtonGroup>
            </TemplateA>
          </Toolbar>
        </AppBar>
      )}
    </React.Fragment>
  );
};

Header.propTypes = {
  inFinnish: PropTypes.string,
  inSwedish: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  locale: PropTypes.string,
  logIn: PropTypes.string,
  logo: PropTypes.object,
  logoutLink: PropTypes.object,
  onLocaleChange: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  organisation: PropTypes.object,
  shortDescription: PropTypes.object
};

export default Header;
