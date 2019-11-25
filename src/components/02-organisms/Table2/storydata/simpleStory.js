import * as R from "ramda";

const colWidths = {
  0: "w-3/12",
  1: "w-2/12",
  2: "w-2/12",
  3: "w-2/12",
  4: "w-2/12",
  5: "w-1/12"
};

const simpleStory = {
  header: {
    rows: R.addIndex(R.map)((row, i) => {
      return {
        cells: R.addIndex(R.map)(
          (col, ii) => {
            return {
              styleClasses: [colWidths[ii], "truncate"],
              text: `Title example ${ii}`,
              isSortable: true,
              sortingTooltip: "Järjestä sarakkeen mukaan"
            };
          },
          [1, 2, 3, 4, 5, 6]
        )
      };
    }, new Array(1))
  },
  body: {
    rows: R.addIndex(R.map)((row, i) => {
      return {
        cells: R.addIndex(R.map)(
          (col, ii) => {
            return {
              styleClasses: [colWidths[ii], "truncate"],
              text: `Example ${Math.random()}`
            };
          },
          [1, 2, 3, 4, 5, 6]
        )
      };
    }, new Array(100))
  }
};

console.info(simpleStory);

export default simpleStory;
