import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import RowGroup from "./RowGroup";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import * as R from "ramda";
import { addRowsToObject, components, getMain, getRowGroup } from "./utils";

const availableComponents = {
  Grid,
  RowGroup,
  TableCell,
  TableRow
};

const TableComponent = ({ components, structure, id = "main" }) => {
  if (!structure[id]) return <div>structure.{id} is missing!</div>;

  function renderIncludedElements(includes = []) {
    console.info(includes);
    return R.map(id => {
      console.info(id);
      if (id.length === 0) {
        return null;
      } else if (Array.isArray(id)) {
        return (
          <div key={Math.random()}>
            {renderIncludedElements(R.filter(R.compose(R.not, R.isEmpty), id))}
          </div>
        );
      } else {
        const _id = R.is(String, id) ? id : R.head(id);
        return (
          <TableComponent
            key={Math.random()}
            components={components}
            structure={structure}
            id={_id}></TableComponent>
        );
      }
    }, R.filter(R.compose(R.not, R.isEmpty), includes));
  }

  return (
    <React.Fragment>
      {R.map(componentSpecs => {
        const component = R.find(
          R.propEq("id", componentSpecs.ref),
          components
        );

        const TagName = availableComponents[component.name];
        // console.info(component.name, componentSpecs.includes);
        return (
          <TagName
            key={Math.random()}
            properties={Object.assign(
              {},
              { id },
              component.properties,
              componentSpecs.properties || {}
            )}>
            <React.Fragment>
              {R.map(id => {
                return (
                  <TableComponent
                    key={Math.random()}
                    components={components}
                    structure={structure}
                    id={id}></TableComponent>
                );
              }, componentSpecs.includes || [])}
            </React.Fragment>
          </TagName>
        );
      }, structure[id].components)}
    </React.Fragment>
  );
};

const Table2 = ({ data }) => {
  const orderSwap = {
    ascending: "descending",
    descending: "ascending"
  };

  const [orderOfBodyRows, setOrderOfBodyRows] = useState({
    columnIndex: 0,
    order: "ascending"
  });

  const bodyRows = useMemo(() => {
    return data.body.rows;
  }, [data.body.rows]);

  const sortedBodyRows = useMemo(() => {
    const sorted = R.sortBy(
      R.path(["cells", orderOfBodyRows.columnIndex, "text"])
    )(bodyRows || []);
    return orderOfBodyRows.order === "ascending" ? sorted : R.reverse(sorted);
  }, [bodyRows, orderOfBodyRows]);

  function onCellClick(action, properties) {
    console.info("on cell click", action, properties);
    if (action === "sort") {
      setOrderOfBodyRows(prevState => {
        let order = R.prop(prevState.order, orderSwap);
        if (prevState.columnIndex !== properties.columnIndex) {
          order = "ascending";
        }
        return { columnIndex: properties.columnIndex, order };
      });
    }
  }

  function onRowClick(action, properties) {
    console.info(action, properties);
  }

  const structure = useMemo(() => {
    return sortedBodyRows
      ? Object.assign(
          {},
          getMain({
            includes: ["rowGroupHeader", "rowGroupBody"]
          }),
          getRowGroup("rowGroupHeader", {
            includes: R.map(
              key => `0-${key}-header`,
              Object.keys(data.header.rows)
            )
          }),
          getRowGroup("rowGroupBody", {
            includes: R.map(key => `0-${key}`, Object.keys(sortedBodyRows))
          }),
          addRowsToObject(data.header.rows, { isHeader: true }, onCellClick),
          addRowsToObject(sortedBodyRows, {}, onRowClick)
        )
      : {};
  }, [sortedBodyRows]);

  console.info(structure);

  return (
    // <div>a</div>
    <TableComponent
      components={components}
      structure={structure}></TableComponent>
  );
};

Table2.propTypes = {
  components: PropTypes.array,
  structure: PropTypes.object
};

export default Table2;
