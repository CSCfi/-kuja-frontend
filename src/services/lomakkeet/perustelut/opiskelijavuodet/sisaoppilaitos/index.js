import { generateDifferenceComponent } from "../../muut";

function getReasoningForm(
  changeObject,
  differenceComponentTitles,
  isReadOnly = false
) {
  return [
    {
      anchor: "sisaoppilaitos",
      title: "Haettava määrä",
      components: [
        generateDifferenceComponent({
          changeObject,
          titles: differenceComponentTitles,
          isReadOnly: true
        })
      ]
    },
    {
      anchor: "sisaoppilaitos",
      title: "Mikä on aiheuttanut muutostarpeen?",
      styleClasses: ["px-10 py-10"],
      components: [
        {
          anchor: "A",
          name: "TextBox",
          properties: {
            isReadOnly,
            placeholder:
              "Perustele lyhyesti miksi tälle muutokselle on tarvetta"
          }
        }
      ]
    }
  ];
}

export default function getSisaoppilaitosOpiskelijavuodetPerustelulomake(
  action,
  data,
  isReadOnly
) {
  switch (action) {
    case "reasoning":
      return getReasoningForm(
        data.changeObject,
        data.differenceTitles,
        isReadOnly
      );
    default:
      return [];
  }
}
