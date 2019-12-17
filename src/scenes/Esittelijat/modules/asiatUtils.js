import * as R from "ramda";

const asiatTableColumnSetup = [
  {title: "Asianumero", widthClass: "w-2/12"},
  {title: "Tila", widthClass: "w-1/12"},
  {title: "Asia", widthClass: "w-3/12"},
  {title: "Asiakkaan nimi", widthClass: "w-3/12"},
  {title: "Maakunta", widthClass: "w-1/12"},
  {title: "Saapunut", widthClass: "w-1/12"},
  {title: "Haettu voimaantulo", widthClass: "w-1/12"},
  {title: "Toiminnot", widthClass: "w-1/12"}
];

const generateAsiatTableHeaderStructure = () => {
  return {
    role: "thead",
    rowGroups: [
      {
        rows: [
          {
            cells: R.map((item) => {
              return {
                isSortable: true,
                truncate: true,
                styleClasses: [item.widthClass],
                text: item.title
              }
            })(asiatTableColumnSetup)
          }
        ]
      }
    ]
  }
};

const getMaakuntaNimiFromHakemus = (hakemus) => {
  const maakuntaObject = R.find(R.propEq("kieli", "FI"))(R.path(["jarjestaja", "maakuntaKoodi", "metadata"], hakemus) || [])
  return maakuntaObject ? maakuntaObject.nimi : '';
};

const getJarjestajaNimiFromHakemus = (hakemus) => {
  return R.path(["jarjestaja", "nimi", "fi"], hakemus) || '';
};

export const generateAsiatTableStructure = (hakemusList) => {
  return [
    generateAsiatTableHeaderStructure(),
    {
      role: "tbody",
      rowGroups: [{
        rows: R.addIndex(R.map)((row, i) => {
          return {
            id: row.uuid,
            cells: R.addIndex(R.map)(
              (col, j) => {
                return {
                  truncate: true,
                  styleClasses: [asiatTableColumnSetup[j].widthClass],
                  text: col.text
                };
              },
              [
                {text: ''},
                {text: row.tila || ''},
                {text: 'Järjestämisluvan muutos'},
                {text: getJarjestajaNimiFromHakemus(row)},
                {text: getMaakuntaNimiFromHakemus(row)},
                {text: row.paivityspvm || ''},
                {text: row.hakupvm || ''}
              ]
            ).concat({
              menu: {
                id: `simple-menu-${i}`,
                actions: [
                  {
                    id: "start-preparing",
                    text: "Ota valmisteluun"
                  }
                ]
              }
            })
          };
        }, hakemusList)
      }]
    },
    {
      role: "tfoot"
    }
  ]
}
