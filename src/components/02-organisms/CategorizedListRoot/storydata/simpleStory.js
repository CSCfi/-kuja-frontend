import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

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
      code: "1",
      title: "Category",
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
                name: "example-checkbox",
                code: 1.1,
                title: "Sub row",
                isChecked: false,
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
                name: "example-checkbox",
                code: "1.2",
                title: "Sub row",
                isChecked: false,
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
                name: "example-checkbox",
                code: "1.3",
                title: "Sub row",
                isChecked: true,
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
            name: "example-checkbox-2",
            code: 2,
            title: "Row item",
            labelStyles: Object.assign({}, isRemoved, isInLupa),
            isChecked: false
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
                name: "example-label",
                code: 2.1,
                title: "Sub row",
                isChecked: true,
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
                name: "example-checkbox",
                code: 2.2,
                title: "Sub row",
                isChecked: false,
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
                    name: "example-label",
                    code: "2.2.1",
                    title: "Sub row",
                    isChecked: true,
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
                    name: "example-checkbox",
                    code: "2.2.2",
                    title: "Sub row",
                    isChecked: false,
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
                    name: "example-checkbox",
                    code: "2.2.3",
                    title: "Sub row",
                    isChecked: false,
                    value: "Testi3"
                  }
                }
              ]
            }
          ],
        },
        {
          code: "2.3",
          title: "Sub category",
          components: [
            {
              name: "CheckboxWithLabel",
              properties: {
                name: "example-checkbox",
                code: 2.3,
                title: "Sub row",
                isChecked: false,
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
