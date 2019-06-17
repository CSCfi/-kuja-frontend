import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

export const radioStory = {
  changes: [
    {
      path: [0, "components", 0],
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
    }
  ],
  categories: [
    {
      code: "0",
      title: "Categories",
      components: [
        {
          name: "RadioButtonWithLabel",
          properties: {
            name: "example-radio-1",
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
          code: "0",
          title: "Categories",
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
              code: "0",
              title: "Categories",
              components: [
                {
                  name: "CheckboxWithLabel",
                  properties: {
                    name: "example-checkbox-1.1.1",
                    code: "1.1.1",
                    title: "Leaf node item",
                    labelStyles: Object.assign({}, isAdded, isInLupa),
                    isChecked: true
                  }
                }
              ]
            },
            {
              code: "1",
              title: "Categories",
              components: [
                {
                  name: "RadioButtonWithLabel",
                  properties: {
                    name: "example-checkbox-1.1.2",
                    code: "1.1.2",
                    title: "Leaf node item",
                    labelStyles: Object.assign({}, isAdded, isInLupa),
                    isChecked: false
                  }
                },
                {
                  name: "Dropdown",
                  properties: {
                    options: [
                      { value: "value1", label: "Value 1" },
                      {
                        value: "value2",
                        label: "Value 2"
                      },
                      { value: "value3", label: "Value 3" }
                    ],
                    isChecked: true
                  }
                }
              ],
              categories: [
                {
                  code: "0",
                  title: "Categories",
                  components: [
                    {
                      name: "RadioButtonWithLabel",
                      properties: {
                        name: "example-radio",
                        code: "1.1.2.1",
                        title: "Deep row",
                        isChecked: false,
                        value: "1.1.2.1"
                      }
                    }
                  ]
                },
                {
                  code: "1",
                  title: "Categories",
                  components: [
                    {
                      name: "RadioButtonWithLabel",
                      properties: {
                        name: "example-radio",
                        code: "1.1.2.2",
                        title: "Deep row",
                        isChecked: false,
                        value: "1.1.2.2"
                      }
                    }
                  ]
                }
              ]
            },
            {
              code: "2",
              title: "Categories",
              components: [
                {
                  name: "RadioButtonWithLabel",
                  properties: {
                    name: "example-checkbox-1.1.3",
                    code: "1.1.3",
                    title: "Leaf node item",
                    labelStyles: Object.assign({}, isAdded, isInLupa),
                    isChecked: true
                  }
                }
              ]
            }
          ]
        },
        {
          code: "1",
          title: "Categories",
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
          code: "2",
          title: "Categories",
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
      code: "1",
      title: "Categories",
      components: [
        {
          name: "RadioButtonWithLabel",
          properties: {
            name: "example-radio-2",
            code: 2,
            title: "Row item",
            labelStyles: Object.assign({}, isRemoved, isInLupa),
            isChecked: false
          }
        }
      ]
    },
    {
      code: "2",
      title: "Categories",
      components: [
        {
          name: "RadioButtonWithLabel",
          properties: {
            name: "example-radio-3",
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
