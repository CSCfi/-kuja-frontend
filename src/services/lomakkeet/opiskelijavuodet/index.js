import "../i18n-config";
import { __ } from "i18n-for-browser";

const title1 = __("current");
const title2 = __("applyFor");
const title3 = __("difference");

const titles = [title1, title2, title3];

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
  koodiarvot,
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
            forChangeObject: {
              koodiarvo: koodiarvot.vahimmaisopiskelijavuodet
            },
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
                forChangeObject: {
                  koodiarvo: koodiarvot.vaativatuki
                },
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
                forChangeObject: {
                  koodiarvo: koodiarvot.sisaoppilaitos
                },
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
        data.koodiarvot,
        data.sectionId
      );
    default:
      return [];
  }
}
