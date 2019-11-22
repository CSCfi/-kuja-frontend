import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { simpleStory } from "./storydata/simpleStory";
import Table2 from "./index";

storiesOf("Table2", module)
  .addDecorator(withInfo)
  .add("Simple table", () => {
    // return (
    //   <Stage
    //     anchor={"simple-story"}
    //     // interval={0}
    //     // loopChanges={[
    //     //   { anchor: "A.0.A", properties: { isChecked: true } },
    //     //   { anchor: "B.0.A", properties: { isChecked: true } },
    //     //   { anchor: "C.0.A", properties: { isChecked: true } },
    //     //   { anchor: "A.0.A", properties: { isChecked: false } },
    //     //   { anchor: "B.0.A", properties: { isChecked: false } },
    //     //   { anchor: "C.0.A", properties: { isChecked: false } }
    //     // ]}
    //     categories={simpleStory.categories}
    //     changes={simpleStory.changes}
    //     render={props => <Table2 {...props} />}></Stage>
    // );

    const components = [
      {
        id: "table-row",
        name: "TableRow",
        properties: {
          isHeader: true
        }
      },
      {
        id: "header-cell",
        name: "TableCell",
        properties: {
          isHeader: true
        }
      },
      {
        id: "cell",
        name: "TableCell"
      }
    ];

    const structure = {
      main: {
        components: [
          {
            ref: "table-row",
            includes: ["thead"]
          },
          {
            ref: "table-row",
            includes: ["tbody"]
          }
        ]
      },
      thead: {
        components: [
          {
            ref: "header-cell",
            properties: {
              title: "Column title 1"
            }
          },
          {
            ref: "header-cell",
            properties: {
              title: "Column title 2"
            }
          },
          {
            ref: "header-cell",
            properties: {
              title: "Column title 3"
            }
          },
          {
            ref: "header-cell",
            properties: {
              title: "Column title 3"
            }
          }
        ]
      },
      tbody: {
        components: [
          {
            ref: "cell",
            properties: {
              title: "Column title 1"
            }
          },
          {
            ref: "cell",
            properties: {
              title: "Column title 2"
            }
          },
          {
            ref: "cell",
            properties: {
              title: "Column title 3"
            }
          },
          {
            ref: "cell",
            properties: {
              title: "Column title 3"
            }
          }
        ]
      }
    };

    return (
      <Table2 structure={structure} components={components} />
      //   <Table2
      //     categories={[
      //       {
      //         anchor: "A",
      //         components: [
      //           {
      //             anchor: "A",
      //             name: "TableRow"
      //           }
      //         ],
      //         categories: [
      //           {
      //             anchor: "A",
      //             components: [
      //               {
      //                 anchor: "A",
      //                 name: "TableCell",
      //                 properties: {
      //                   isHeader: true,
      //                   title: "Col 1 title"
      //                 }
      //               },
      //               {
      //                 anchor: "B",
      //                 name: "TableCell",
      //                 properties: {
      //                   isHeader: true,
      //                   title: "Col 2 title"
      //                 }
      //               },
      //               {
      //                 anchor: "A",
      //                 name: "TableCell",
      //                 properties: {
      //                   isHeader: true,
      //                   title: "Col 3 title"
      //                 }
      //               },
      //               {
      //                 anchor: "B",
      //                 name: "TableCell",
      //                 properties: {
      //                   isHeader: true,
      //                   title: "Col 4 title"
      //                 }
      //               }
      //             ]
      //           }
      //         ]
      //       },
      //       {
      //         anchor: "A",
      //         components: [
      //           {
      //             anchor: "A",
      //             name: "TableRow"
      //           }
      //         ],
      //         categories: [
      //           {
      //             anchor: "A",
      //             components: [
      //               {
      //                 anchor: "A",
      //                 name: "TableCell",
      //                 properties: {
      //                   title: "1"
      //                 }
      //               },
      //               {
      //                 anchor: "B",
      //                 name: "TableCell",
      //                 properties: {
      //                   title: "Asiakirjan otsikko"
      //                 }
      //               },
      //               {
      //                 anchor: "A",
      //                 name: "TableCell",
      //                 properties: {
      //                   title: "Col 3 title"
      //                 }
      //               },
      //               {
      //                 anchor: "B",
      //                 name: "TableCell",
      //                 properties: {
      //                   title: "Col 4 title"
      //                 }
      //               }
      //             ]
      //           }
      //         ]
      //       }
      //     ]}></Table2>
    );
  });
