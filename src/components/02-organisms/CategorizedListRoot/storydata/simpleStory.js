import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

const labelStyles = {
  addition: isAdded,
  removal: isRemoved
};

export const simpleStory = {
  changes: [
    {
      path: [0, "components", 0],
      properties: {
        isChecked: true,
        title: "Erikoisammattitutkinto (muutos)"
      }
    },
    {
      path: [1, "components", 0],
      properties: {
        isChecked: false,
        title: "Koulutukseen panostettu on (muutos)"
      }
    },
    {
      path: [2, "components", 0],
      properties: {
        isChecked: true,
        title: "Alakoulu ja yläkoulu (muutos)"
      }
    },
    {
      path: [0, "categories", 0, "components", 0],
      properties: {
        isChecked: true,
        title: "Osaamisala (muutos)"
      }
    },
    {
      path: [0, "categories", 1, "categories", 0, "components", 1],
      properties: {
        isChecked: true,
        title: "Osaamisala (muutos)"
      }
    }
  ],
  categories: [
    {
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
              code: "2.2.1",
              title: "Sub category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    code: "2.2.1",
                    title: "Sub row",
                    isChecked: true,
                    labelStyles,
                    name: "example-label",
                    value: "Testi"
                  }
                }
              ]
            },
            {
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
