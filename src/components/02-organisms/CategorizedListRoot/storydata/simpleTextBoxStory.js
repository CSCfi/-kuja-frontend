import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

const labelStyles = {
  addition: isAdded,
  removal: isRemoved
};

export const simpleTextBoxStory = {
  changes: [],
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
          code: "1",
          title: "Category",
          components: [
            {
              name: "TextBox",
              properties: {
                defaultValue: "Default value"
              }
            }
          ]
        }
      ]
    }
  ]
};
