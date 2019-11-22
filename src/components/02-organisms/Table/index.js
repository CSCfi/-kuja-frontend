import React from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import "react-table/react-table.css";

const defaultProps = {
  columns: [],
  data: []
};

const Table = ({
  columns = defaultProps.columns,
  data = defaultProps.data
}) => {
  return <ReactTable data={data} columns={columns} />;
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default Table;
