import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

const labelStyles = {
  addition: isAdded,
  removal: isRemoved
};

export const simpleStory = {
  changes: [
    {
      anchor: "simple.A",
      path: [0, "components", 0],
      properties: {
        isChecked: true,
        title: "Erikoisammattitutkinto (muutos)"
      }
    },
    {
      anchor: "simple.C",
      path: [2, "components", 0],
      properties: {
        isChecked: true,
        title: "Alakoulu ja yläkoulu (muutos)"
      }
    },
    {
      anchor: "simple.A.A",
      path: [0, "categories", 0, "components", 0],
      properties: {
        isChecked: true,
        title: "Osaamisala (muutos)"
      }
    },
    {
      anchor: "simple.B.B.A",
      path: [1, "categories", 1, "categories", 0, "components", 0],
      properties: {
        isChecked: true,
        title: "Osaamisala (muutos)"
      }
    }
  ],
  categories: [
    {
      anchor: "A",
      code: "1",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            code: "A",
            isChecked: false,
            labelStyles: Object.assign({}, labelStyles, {
              custom: isInLupa
            }),
            name: "example-checkbox-1",
            title: "Row item"
          }
        }
      ],
      categories: [
        {
          anchor: "A",
          code: "1.1",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "A.A",
                isChecked: false,
                labelStyles: Object.assign({}, labelStyles, {
                  custom: isInLupa
                }),
                name: "example-checkbox",
                title: "Sub row",
                value: "Testi"
              }
            }
          ]
        },
        {
          anchor: "B",
          code: "1.2",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "A.B",
                isChecked: false,
                labelStyles,
                name: "example-checkbox",
                title: "Sub row",
                value: "Testi2"
              }
            }
          ]
        },
        {
          anchor: "C",
          code: "3",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "A.C",
                isChecked: true,
                labelStyles: Object.assign({}, labelStyles, {
                  custom: isInLupa
                }),
                name: "example-checkbox",
                title: "Sub row",
                value: "Testi3"
              }
            }
          ]
        }
      ]
    },
    {
      anchor: "B",
      code: "2",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            code: "B",
            isChecked: true,
            labelStyles,
            name: "example-checkbox-2",
            title: "Row item"
          }
        }
      ],
      categories: [
        {
          anchor: "A",
          code: "2.1",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "B.A",
                isChecked: true,
                labelStyles,
                name: "example-label",
                title: "Sub row",
                value: "Testi"
              }
            }
          ]
        },
        {
          anchor: "B",
          code: "2.2",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "B.B",
                isChecked: false,
                labelStyles,
                name: "example-checkbox",
                title: "Sub row",
                value: "Testi2"
              }
            }
          ],
          categories: [
            {
              anchor: "A",
              code: "2.2.1",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "B.B.A",
                    title: "Sub row",
                    isChecked: false,
                    labelStyles,
                    name: "example-label",
                    value: "Testi"
                  }
                }
              ]
            },
            {
              anchor: "B",
              code: "2.2.2",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "B.B.B",
                    isChecked: false,
                    labelStyles,
                    name: "example-checkbox",
                    title: "Sub row",
                    value: "Testi2"
                  }
                }
              ]
            },
            {
              anchor: "C",
              code: "2.2.3",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "B.B.C",
                    isChecked: false,
                    labelStyles,
                    name: "example-checkbox",
                    title: "Sub row",
                    value: "Testi3"
                  }
                }
              ]
            }
          ]
        },
        {
          anchor: "C",
          code: "2.3",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "B.C",
                isChecked: false,
                labelStyles,
                name: "example-checkbox",
                title: "Sub row",
                value: "Testi3"
              }
            }
          ]
        }
      ],
      changes: []
    },
    {
      anchor: "C",
      code: "3",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            code: "C",
            isChecked: false,
            labelStyles: Object.assign({}, labelStyles, {
              custom: isInLupa
            }),
            name: "example-checkbox-3",
            title: "Row item"
          }
        }
      ]
    }
  ]
};
