import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, makeStyles } from "@material-ui/core";
import TemplateB from "../../03-templates/TemplateB";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import * as R from "ramda";

import "./horizontal-navigation.module.css";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  }
}));

const HorizontalNavigation = ({ links }) => {
  const classes = useStyles();

  const items = R.addIndex(R.map)((link, index) => {
    return (
      <NavLink
        key={`link-${index}`}
        exact={link.isExact}
        activeClassName="active"
        to={link.path}
        className={`px-8 border-r border-green-600 py-4 flex-1 tracking-wider min-w-200 lg:max-w-xxs sm:min-w-initial
        bg-green-500 hover:bg-green-400 text-white text-center flex-wrap whitespace-no-wrap`}>
        {link.text}
      </NavLink>
    );
  }, links);

  return (
    <AppBar position="static" classes={classes}>
      <Toolbar
        variant="dense"
        className="flex flex-wrap bg-white text-black border 
        border-gray-300 text-sm overflow-auto hide-scrollbar bg-green-500"
        disableGutters={true}>
        <Router>
          <TemplateB items={items}></TemplateB>
        </Router>
      </Toolbar>
    </AppBar>
  );
};

HorizontalNavigation.propTypes = {
  links: PropTypes.array
};

export default HorizontalNavigation;
