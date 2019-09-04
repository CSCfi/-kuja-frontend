import * as R from "ramda";

export const getAdditionFormStructure = (checkboxItems, locale) => {
  const titleObj = {
    anchor: "perustelut",
    components: [
      {
        name: "StatusTextRow",
        properties: {
          title: "Muutospyynnön taustalla olevat syyt"
        }
      }
    ]
  };
  const checkboxes = R.map(checkboxItem => {
    const metadata = R.find(R.propEq("kieli", locale))(checkboxItem.metadata);
    return {
      anchor: checkboxItem.koodiArvo,
      components: [
        {
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            isChecked: false,
            title: metadata.nimi
          }
        }
      ]
    };
  }, checkboxItems);
  return R.flatten([
    titleObj,
    checkboxes,
    {
      anchor: "vapaa-tekstikentta",
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            placeholder:
              "Perustele lyhyesti miksi tutkintoon johtavaa koulutusta halutaan järjestää"
          }
        }
      ]
    }
  ]);
};

export const getRemovalFormStructure = () => {
  return [
    {
      anchor: "vapaa-tekstikentta",
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            placeholder:
              "Perustele lyhyesti miksi tutkintoon tähtäävää koulutusta ei haluta enää järjestää"
          }
        }
      ]
    }
  ];
};

export const getOsaamisalaFormStructure = () => {
  return [
    {
      anchor: "vapaa-tekstikentta",
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            placeholder:
              "Perustele lyhyesti miksi tälle muutokselle on tarvetta"
          }
        }
      ]
    }
  ];
};