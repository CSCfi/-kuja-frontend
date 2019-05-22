import React from "react";
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
import { ROLE_ESITTELIJA } from "../../../modules/constants";
import * as R from "ramda";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const SideNavigation = props => {
  const classes = useStyles();
  
  const ytunnus =
    props.oppilaitos && props.oppilaitos.organisaatio
      ? props.oppilaitos.organisaatio.ytunnus
      : false;

  const pageLinks = [
    { path: "/esi-ja-perusopetus", text: "Esi- ja perusopetus" },
    { path: "/lukiokoulutus", text: "Lukiokoulutus" },
    { path: "/jarjestajat", text: "Ammatillinen koulutus" },
    { path: "/vapaa-sivistystyo", text: "Vapaa sivistystyö" },
    { path: "/tilastot", text: "Tilastot" }
  ];

  if (sessionStorage.getItem("role") === ROLE_ESITTELIJA) {
    pageLinks.push({
      path: "/asiat",
      text: "Asiat"
    })
  }

  const handleDrawerToggle = () => {
    props.onDrawerToggle();
  };

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
            subheader="Olet kirjautunut sisään"
          />
        </Card>
      )}
      <List>
        {pageLinks.map(link => (
          <ListItem button key={link.text}>
            <NavLink to={link.path} className="no-underline">
              {link.text}
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key="oma_organisaatio">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <NavLink
            className="no-underline"
            ytunnus={ytunnus}
            to={{
              pathname: "/jarjestajat/" + ytunnus + "/omattiedot",
              ytunnus: ytunnus
            }}
            exact
          >
            Oma organisaatio
          </NavLink>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          { path: "/fi", text: "Suomeksi" },
          { path: "/sv", text: "På svenska" }
        ].map(link => (
          <ListItem button key={link.text}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <NavLink to={link.path} className="no-underline">
              {link.text}
            </NavLink>
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
              Kirjaudu sisään
            </NavLink>
          </ListItem>
        </List>
      )}
      {props.user && props.user.username && (
        <List>
          <ListItem button key="logout">
            <ListItemIcon>
              <Fingerprint />
            </ListItemIcon>
            <NavLink to="/cas-logout" className="no-underline">
              Kirjaudu ulos
            </NavLink>
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <div>
      <Drawer open={props.shouldBeVisible} onClose={handleDrawerToggle}>
        <div
          tabIndex={0}
          role="button"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
};

export default SideNavigation;
