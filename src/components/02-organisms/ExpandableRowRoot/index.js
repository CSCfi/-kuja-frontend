import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import ExpandableRow from "./ExpandableRow";
import CategorizedListRoot from "../CategorizedListRoot";
import NumberOfChanges from "components/00-atoms/NumberOfChanges";
import { makeStyles } from "@material-ui/core/styles";
import UndoIcon from "@material-ui/icons/Undo";
import * as R from "ramda";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import commonMessages from "../../../i18n/definitions/common";

const useStyles = makeStyles(() => ({
  button: {
    padding: 0
  }
}));

const compare = (prevProps, nextProps) => {
  const sameCategories = R.equals(prevProps.categories, nextProps.categories);
  const sameChanges = R.equals(prevProps.changes, nextProps.changes);
  return sameCategories && sameChanges;
};

const ExpandableRowRoot = React.memo(props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.categories && (
        <ExpandableRow shouldBeExpanded={props.isExpanded}>
          <div data-slot="title">
            {props.code && <span className="pr-6">{props.code}</span>}
            <span>{props.title}</span>
          </div>
          <div data-slot="info">
            {props.changes.length > 0 && (
              <div className="flex items-center">
                <NumberOfChanges changes={props.changes} />
                <span className="mx-6">
                  <Tooltip title={ props.intl.formatMessage(commonMessages.undo) }>
                    <IconButton
                      className={classes.button}
                      variant="outlined"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        return props.onChangesRemove(
                          props.sectionId,
                          props.anchor,
                          props.index
                        );
                      }}
                    >
                      <UndoIcon />
                    </IconButton>
                  </Tooltip>
                </span>
              </div>
            )}
          </div>
          <div data-slot="content" className="w-full">
            <CategorizedListRoot
              anchor={props.anchor}
              categories={props.categories}
              changes={props.changes}
              index={props.index}
              onUpdate={props.onUpdate}
              sectionId={props.sectionId}
              showCategoryTitles={true}
            />
          </div>
        </ExpandableRow>
      )}
    </React.Fragment>
  );
}, compare);

ExpandableRowRoot.defaultProps = {
  changes: [],
  isExpanded: false
};

ExpandableRowRoot.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  code: PropTypes.string,
  index: PropTypes.number,
  isExpanded: PropTypes.bool,
  onChangesRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  sectionId: PropTypes.string,
  title: PropTypes.string
};

export default injectIntl(ExpandableRowRoot);
