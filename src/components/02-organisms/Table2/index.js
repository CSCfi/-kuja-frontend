import React from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import RowGroup from "./RowGroup";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import * as R from "ramda";

const availableComponents = {
  Grid,
  RowGroup,
  TableCell,
  TableRow
};

const Table2 = ({ components, structure, id = "main" }) => {
  if (!structure[id]) return <div>structure.{id} is missing!</div>;
  return (
    <React.Fragment>
      {R.map(componentSpecs => {
        const component = R.find(
          R.propEq("id", componentSpecs.ref),
          components
        );

        const TagName = availableComponents[component.name];

        return (
          <TagName
            key={Math.random()}
            properties={Object.assign(
              {},
              component.properties,
              componentSpecs.properties || {}
            )}>
            <React.Fragment>
              {R.map(id => {
                return (
                  <Table2
                    key={Math.random()}
                    components={components}
                    structure={structure}
                    id={id}></Table2>
                );
              }, componentSpecs.includes || [])}
            </React.Fragment>
          </TagName>
        );
      }, structure[id].components)}
    </React.Fragment>
  );
};

Table2.propTypes = {
  components: PropTypes.array,
  structure: PropTypes.object
};

export default Table2;
