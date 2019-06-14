import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

export const complexStory = {
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
        isChecked: true,
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
      code: "01",
      title: "Category 1",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            name: "example-checkbox-1",
            code: 1,
            title: "Row item",
            labelStyles: Object.assign({}, isAdded, isInLupa),
            isChecked: false
          }
        },
        {
          name: "Dropdown",
          properties: {
            options: [
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" }
            ]
          }
        }
      ],
      categories: [
        {
          code: "01",
          title: "Sub category",
          components: [
            {
              name: "RadioButtonWithLabel",
              properties: {
                name: "example-radio",
                code: 1.1,
                title: "Sub row",
                isChecked: false,
                value: "Testi"
              }
            }
          ],
          categories: [
            {
              code: "01",
              title: "Leaf node category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    name: "example-checkbox-1.1.1",
                    code: "1.1.1",
                    title: "Leaf node item",
                    labelStyles: Object.assign({}, isAdded, isInLupa),
                    isChecked: false
                  }
                }
              ]
            },
            {
              code: "02",
              title: "Leaf node category",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    name: "example-checkbox-1.1.2",
                    code: "1.1.2",
                    title: "Leaf node item",
                    labelStyles: Object.assign({}, isAdded, isInLupa),
                    isChecked: true
                  }
                },
                {
                  name: "Dropdown",
                  properties: {
                    options: [
                      { value: "chocolate", label: "Chocolate" },
                      {
                        value: "strawberry",
                        label: "Strawberry"
                      },
                      { value: "vanilla", label: "Vanilla" }
                    ],
                    isChecked: true
                  }
                }
              ]
            }
          ]
        },
        {
          code: "02",
          title: "Sub category",
          components: [
            {
              name: "RadioButtonWithLabel",
              properties: {
                name: "example-radio",
                code: "1.2",
                title: "Sub row",
                isChecked: false,
                value: "Testi2"
              }
            }
          ]
        },
        {
          code: "03",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                name: "example-checkbox",
                code: "1.3",
                title: "Sub row",
                isChecked: false,
                value: "Testi3"
              }
            }
          ]
        }
      ]
    },
    {
      code: "02",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            name: "example-checkbox-2",
            code: 2,
            title: "Row item",
            labelStyles: Object.assign({}, isRemoved, isInLupa),
            isChecked: false
          }
        }
      ]
    },
    {
      code: "03",
      title: "Category",
      components: [
        {
          name: "CheckboxWithLabel",
          properties: {
            name: "example-checkbox-3",
            code: 3,
            title: "Row item",
            labelStyles: Object.assign(isInLupa),
            isChecked: false
          }
        }
      ]
    }
  ]
};
