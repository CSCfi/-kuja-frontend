import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

const labelStyles = {
  addition: isAdded,
  removal: isRemoved
};

export const simpleStory = {
  changes: [
    {
      anchor: "simple.0",
      path: [0, "components", 0],
      properties: {
        isChecked: true,
        title: "Erikoisammattitutkinto (muutos)"
      }
    },
    {
      anchor: "simple.2",
      path: [2, "components", 0],
      properties: {
        isChecked: true,
        title: "Alakoulu ja yläkoulu (muutos)"
      }
    },
    {
      anchor: "simple.0.0",
      path: [0, "categories", 0, "components", 0],
      properties: {
        isChecked: true,
        title: "Osaamisala (muutos)"
      }
    },
    {
      anchor: "simple.1.1.0",
      path: [1, "categories", 1, "categories", 0, "components", 0],
      properties: {
        isChecked: true,
        title: "Osaamisala (muutos)"
      }
    }
  ],
  categories: [
    {
      anchor: "0",
      code: "1",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            code: "1",
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
          anchor: "0",
          code: "1.1",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "1.1",
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
          anchor: "1",
          code: "1.2",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "1.2",
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
          anchor: "2",
          code: "1.3",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "1.3",
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
      anchor: "1",
      code: "2",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            code: "2",
            isChecked: true,
            labelStyles,
            name: "example-checkbox-2",
            title: "Row item"
          }
        }
      ],
      categories: [
        {
          anchor: "0",
          code: "2.1",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "2.1",
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
          anchor: "1",
          code: "2.2",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "2.2",
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
              anchor: "0",
              code: "2.2.1",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "2.2.1",
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
              anchor: "1",
              code: "2.2.2",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "2.2.2",
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
              anchor: "2",
              code: "2.2.3",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "2.2.3",
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
          anchor: "2",
          code: "2.3",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                code: "2.3",
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
      anchor: "2",
      code: "3",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            code: "3",
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
