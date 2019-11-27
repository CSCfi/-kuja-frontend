import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import * as R from "ramda";

function SimpleMenu({ actions }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, action) => {
    event.stopPropagation();
    if (action) {
      if (action.onClick) {
        action.onClick(action);
      }
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {R.addIndex(R.map)((action, i) => {
          return (
            <MenuItem
              key={`action-${i}`}
              onClick={e => {
                handleClose(e, action);
                return false;
              }}>
              {action.text}
            </MenuItem>
          );
        }, actions)}
      </Menu>
    </div>
  );
}

SimpleMenu.propTypes = {
  actions: PropTypes.array
};

export default SimpleMenu;
