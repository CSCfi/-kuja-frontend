import React from "react";
import * as R from "ramda";
import PropTypes from "prop-types";

function createJSXForDOM(category) {
  const updatedJSX = R.map(component => {
    if (component.name === "TableRow") {
      return (
        <div key={`key-${Math.random()}`} role="row" className="flex">
          {R.map(category => {
            return createJSXForDOM(category, updatedJSX);
          }, category.categories)}
        </div>
      );
    } else if (component.name === "TableCell") {
      console.info(component);
      return (
        <div
          key={`key-${Math.random()}`}
          role={component.properties.isHeader ? "columnheader" : "gridCell"}
          className={`${
            component.properties.isHeader ? "bg-green-400" : ""
          } border p-4`}>
          {component.properties.title}
        </div>
      );
    }
  }, category.components);

  //   if (Array.isArray(category.categories)) {
  //     return (
  //       <div key={category.anchor}>
  //         {R.map(category => {
  //           return createJSXForDOM(category, updatedJSX);
  //         }, category.categories)}
  //       </div>
  //     );
  //   }
  console.info(updatedJSX);
  return updatedJSX;
}

const Table2 = ({ categories = [], children }) => {
  console.info(children);
  return (
    <div>
      {R.addIndex(R.map)((category, i) => {
        const JSX = createJSXForDOM(category);
        // const componentsJSX = R.map(component => {
        //   console.info(component.name);
        //   if (component.name === "TableRow") {
        //     return (
        //       <div key={component.anchor} role="row" className="flex">
        //         Table row
        //       </div>
        //     );
        //   } else if (component.name === "TableCell") {
        //     return (
        //       <div key={component.anchor} role="columnheader">
        //         Example text
        //       </div>
        //     );
        //   }
        // }, category.components || []);
        // console.info("new table");
        // return (
        //   <React.Fragment key={i}>
        //     {category.categories && (
        //       <Table2 key={category.anchor} categories={category.categories}>
        //         {componentsJSX}
        //       </Table2>
        //     )}
        //   </React.Fragment>
        // );
        return JSX;
      }, categories || [])}
    </div>
  );
};

Table2.propTypes = {
  categories: PropTypes.array
};

export default Table2;
