import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Home from "@material-ui/icons/Home";
import Language from "@material-ui/icons/Language";
import Fingerprint from "@material-ui/icons/Fingerprint";
import CardHeader from "@material-ui/core/CardHeader";
import { NavLink } from "react-router-dom";
import { Card } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { setLocale } from "../../../services/app/actions";
import { injectIntl } from "react-intl";
import authMessages from "../../../i18n/definitions/auth";
import langMessages from "../../../i18n/definitions/languages";
import { AppContext } from "../../../context/appContext";
import Button from "@material-ui/core/Button";
import * as R from "ramda";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  languages: {
    color: "red"
  }
});

const SideNavigation = props => {
  const classes = useStyles();
  const { dispatch: appDispatch } = useContext(AppContext);

  const handleDrawerToggle = () => {
    props.onDrawerToggle();
  };

  const handleLocaleChange = locale => {
    setLocale(locale)(appDispatch);
    if (locale) {
      sessionStorage.setItem("locale", locale);
    } else {
      sessionStorage.removeItem("locale");
    }
  };

  const {
    intl: { formatMessage }
  } = props;

  const sideList = (
    <div className={classes.list}>
      {props.user && props.user.username && (
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {R.head(props.user.username)}
              </Avatar>
            }
            title={props.user.username}
            subheader={formatMessage(authMessages.loggedInInfo)}
          />
        </Card>
      )}
      {props.ytunnus && (
        <List>
          <ListItem button key="oma_organisaatio">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <NavLink
              className="no-underline"
              ytunnus={props.ytunnus}
              to={{
                pathname: "/jarjestajat/" + props.ytunnus + "/omattiedot",
                ytunnus: props.ytunnus
              }}
              exact>
              Oma organisaatio
            </NavLink>
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        {props.pageLinks.map(link => (
          <ListItem button key={link.text}>
            <NavLink to={link.path} className="no-underline">
              {link.text}
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { path: "/fi", key: "inFinnish", text: "Suomeksi", value: "fi" },
          { path: "/sv", key: "inSwedish", text: "På svenska", value: "sv" }
        ].map(item => (
          <ListItem button key={item.key}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <Button onClick={() => handleLocaleChange(item.value)} size="small">
              {formatMessage(langMessages[item.key])}
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
      {!sessionStorage.getItem("role") && (
        <List>
          <ListItem button key="login">
            <ListItemIcon>
              <Fingerprint />
            </ListItemIcon>
            <NavLink to="/cas-auth" className="no-underline">
              {formatMessage(authMessages.logIn)}
            </NavLink>
          </ListItem>
        </List>
      )}
      {props.user && props.user.username && sessionStorage.getItem("role") && (
        <List>
          <ListItem button key="logout">
            <ListItemIcon>
              <Fingerprint />
            </ListItemIcon>
            <NavLink to="/cas-logout" className="no-underline">
              {formatMessage(authMessages.logOut)}
            </NavLink>
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <div data-testid="side-navigation">
      <Drawer open={props.shouldBeVisible} onClose={handleDrawerToggle}>
        <div
          tabIndex={0}
          role="button"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}>
          {sideList}
        </div>
      </Drawer>
    </div>
  );
};

export default injectIntl(SideNavigation);
