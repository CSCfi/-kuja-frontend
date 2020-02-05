import "../i18n-config";
import { __ } from "i18n-for-browser";

const titles = [__("current"), __("applyFor"), __("difference")];

function getModificationForm(
  applyFor,
  applyForSisaoppilaitos,
  applyForVaativa,
  initialValue,
  initialValueSisaoppilaitos,
  initialValueVaativa,
  isSisaoppilaitosVisible,
  isVaativaTukiVisible,
  isSisaoppilaitosValueRequired,
  isVaativaTukiValueRequired,
  sectionId
) {
  return [
    {
      anchor: "vahimmaisopiskelijavuodet",
      title: __("minimumAmountOfYears"),
      components: [
        {
          anchor: "A",
          name: "Difference",
          properties: {
            initialValue: initialValue,
            applyForValue: applyFor,
            name: `${sectionId}-difference-1`,
            titles
          }
        }
      ]
    },
    isVaativaTukiVisible
      ? {
          anchor: "vaativatuki",
          title: __("limitForSpecialSupport"),
          components: [
            {
              anchor: "A",
              name: "Difference",
              properties: {
                isRequired: isVaativaTukiValueRequired,
                initialValue: initialValueVaativa,
                applyForValue: applyForVaativa,
                name: `${sectionId}-difference-2`,
                titles
              }
            }
          ]
        }
      : null,
    isSisaoppilaitosVisible
      ? {
          anchor: "sisaoppilaitos",
          title: __("limitForBoardingSchool"),
          components: [
            {
              anchor: "A",
              name: "Difference",
              properties: {
                isRequired: isSisaoppilaitosValueRequired,
                initialValue: initialValueSisaoppilaitos,
                applyForValue: applyForSisaoppilaitos,
                name: `${sectionId}-difference-3`,
                titles
              }
            }
          ]
        }
      : null
  ].filter(Boolean);
}

export default function getOpiskelijavuodetLomake(action, data) {
  switch (action) {
    case "modification":
      return getModificationForm(
        data.applyFor,
        data.applyForSisaoppilaitos,
        data.applyForVaativa,
        data.initialValue,
        data.initialValueSisaoppilaitos,
        data.initialValueVaativa,
        data.isSisaoppilaitosVisible,
        data.isVaativaTukiVisible,
        data.isSisaoppilaitosValueRequired,
        data.isVaativaTukiValueRequired,
        data.sectionId
      );
    default:
      return [];
  }
}
