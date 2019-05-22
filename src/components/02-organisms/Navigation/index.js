import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import LinkItem from "../../../scenes/Header/components/LinkItem";
import { COLORS, FONT_STACK } from "modules/styles";
import { ROLE_ESITTELIJA } from "modules/constants";

const HeaderBarLower = styled.div`
  display: flex;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  margin: 0 auto;
  padding-left: 20px;
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

const Navigation = ({ user = {}, oppilaitos, dispatch }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const ytunnus =
    oppilaitos && oppilaitos.organisaatio
      ? oppilaitos.organisaatio.ytunnus
      : false;

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <HeaderBarLower>
          {/* TODO: localization! */}
          <LinkItem to="/" exact fontFamily={FONT_STACK.OPEN_SANS_REGULAR}>
            Etusivu
          </LinkItem>
          <LinkItem to="/esi-ja-perusopetus">Esi- ja perusopetus</LinkItem>
          <LinkItem to="/lukiokoulutus">Lukiokoulutus</LinkItem>
          <LinkItem to="/jarjestajat">Ammatillinen koulutus</LinkItem>
          <LinkItem to="/vapaa-sivistystyo">Vapaa sivistystyö</LinkItem>
          <LinkItem to="/tilastot">Tilastot</LinkItem>

          {ytunnus && (
            <LinkItem
              // onClick={this.forceUpdate}
              ytunnus={ytunnus}
              to={{
                pathname: "/jarjestajat/" + ytunnus + "/omattiedot",
                ytunnus: ytunnus
              }}
              exact
            >
              Oma organisaatio
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

export default Navigation;
