import React from "react";
import * as R from "ramda";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {Helmet} from "react-helmet";

import common from "../../../i18n/definitions/common";
import {useIntl} from "react-intl";
import Table from "okm-frontend-components/dist/components/02-organisms/Table"

const VapaaSivistystyo = ({history}) => {
  const intl = useIntl();
  const luvat = [{
    "diaarinumero": "219/531/2017",
    "jarjestajaYtunnus": "2811092-2",
    "jarjestajaOid": "1.2.246.562.10.48291859840",
    "alkupvm": "2018-01-01",
    "paatospvm": "2017-10-06",
    "meta": {
      "ministeri": "Sanni Grahn-Laasonen",
      "esittelija": "Tarja Koskimäki",
      "ministeri_nimike": "Opetus- ja kulttuuriministeri",
      "esittelija_nimike": "Ylitarkastaja"
    },
    "maksu": false,
    "uuid": "cc3c20a2-43b6-11e8-b2ef-005056aa0e66",
    "jarjestaja": {
      "oid": "1.2.246.562.10.48291859840",
      "ytunnus": "2811092-2",
      "parentOid": "1.2.246.562.10.00000000001",
      "parentOidPath": "|1.2.246.562.10.00000000001|",
      "kotipaikkaUri": "kunta_091",
      "nimi": {"fi": "Ammattiopisto Spesia Oy"},
      "postiosoite": {
        "osoiteTyyppi": "posti",
        "osoite": "PL 46",
        "postitoimipaikka": "JÄRVENPÄÄ",
        "postinumeroUri": "posti_04401"
      },
      "kayntiosoite": {
        "osoiteTyyppi": "kaynti",
        "osoite": "Mannilantie 27-29",
        "postitoimipaikka": "JÄRVENPÄÄ",
        "postinumeroUri": "posti_04400"
      },
      "yhteystiedot": [{"www": "http://www.spesia.fi"}, {}, {"numero": "0406353532"}, {"email": "mia.sarpolahti@spesia.fi"}, {}],
      "kuntaKoodi": {
        "koodiArvo": "091",
        "koodisto": {"koodistoUri": "kunta"},
        "versio": 2,
        "metadata": [{"kieli": "FI", "nimi": "Helsinki"}, {"kieli": "SV", "nimi": "Helsingfors"}],
        "voimassaAlkuPvm": "1990-01-01"
      },
      "maakuntaKoodi": {
        "koodiArvo": "01",
        "koodisto": {"koodistoUri": "maakunta"},
        "versio": 1,
        "metadata": [{"kieli": "EN", "nimi": "Uusimaa", "kuvaus": "Uusimaa"}, {
          "kieli": "SV",
          "nimi": "Nyland",
          "kuvaus": "Nyland"
        }, {"kieli": "FI", "nimi": "Uusimaa", "kuvaus": "Uusimaa"}],
        "voimassaAlkuPvm": "1993-01-01"
      },
      "muutKotipaikatUris": []
    }
  }, {
    "diaarinumero": "199/531/2017",
    "jarjestajaYtunnus": "2189108-4",
    "jarjestajaOid": "1.2.246.562.10.27577940193",
    "alkupvm": "2018-01-01",
    "paatospvm": "2017-10-06",
    "meta": {
      "ministeri": "Sanni Grahn-Laasonen",
      "esittelija": "Tarja Koskimäki",
      "ministeri_nimike": "Opetusministeri",
      "esittelija_nimike": "Ylitarkastaja"
    },
    "maksu": false,
    "uuid": "cc3c21ba-43b6-11e8-b2ef-005056aa0e66",
    "jarjestaja": {
      "oid": "1.2.246.562.10.27577940193",
      "ytunnus": "2189108-4",
      "parentOid": "1.2.246.562.10.00000000001",
      "parentOidPath": "|1.2.246.562.10.00000000001|",
      "kotipaikkaUri": "kunta_091",
      "nimi": {"fi": "Cimson Koulutuspalvelut Oy"},
      "postiosoite": {
        "osoiteTyyppi": "posti",
        "osoite": "Väinönkatu 26 A",
        "postitoimipaikka": "JYVÄSKYLÄ",
        "postinumeroUri": "posti_40100"
      },
      "kayntiosoite": {
        "osoiteTyyppi": "kaynti",
        "osoite": "Väinönkatu 26 A",
        "postitoimipaikka": "JYVÄSKYLÄ",
        "postinumeroUri": "posti_40100"
      },
      "yhteystiedot": [{}, {"numero": "0207912978"}, {"email": "info@cimson.fi"}, {"www": "http://www.cimsonkoulutuspalvelut.fi"}, {}],
      "kuntaKoodi": {
        "koodiArvo": "091",
        "koodisto": {"koodistoUri": "kunta"},
        "versio": 2,
        "metadata": [{"kieli": "FI", "nimi": "Helsinki"}, {"kieli": "SV", "nimi": "Helsingfors"}],
        "voimassaAlkuPvm": "1990-01-01"
      },
      "maakuntaKoodi": {
        "koodiArvo": "01",
        "koodisto": {"koodistoUri": "maakunta"},
        "versio": 1,
        "metadata": [{"kieli": "EN", "nimi": "Uusimaa", "kuvaus": "Uusimaa"}, {
          "kieli": "SV",
          "nimi": "Nyland",
          "kuvaus": "Nyland"
        }, {"kieli": "FI", "nimi": "Uusimaa", "kuvaus": "Uusimaa"}],
        "voimassaAlkuPvm": "1993-01-01"
      },
      "muutKotipaikatUris": []
    }
  }];

  const colWidths = {
    0: "w-4/6",
    1: "w-2/6"
  };

  const tableStructure = [
    {
      role: "thead",
      rowGroups: [
        {
          rows: [
            {
              cells: R.addIndex(R.map)(
                (col, ii) => {
                  return {
                    isSortable: true,
                    truncate: true,
                    styleClasses: [colWidths[ii]],
                    text: col.text
                  };
                },
                [
                  { text: "Koulutuksen järjestäjä" },
                  { text: "Kotipaikan maakunta" }
                ]
              )
            }
          ]
        }
      ]
    },
    {
      role: "tbody",
      rowGroups: [
        {
          rows: R.addIndex(R.map)(row => {
            const jarjestajanNimi =
              row.jarjestaja.nimi[intl.locale] ||
              row.jarjestaja.nimi.fi ||
              "[nimi puuttuu]";
            const maakunta = R.find(
              R.propEq("kieli", R.toUpper(intl.locale)),
              row.jarjestaja.maakuntaKoodi.metadata
            );
            return {
              id: row.jarjestajaYtunnus,
              onClick: row => {
                if (history) {
                  //TODO: history.push(`vapaa-sivistystyo/${row.id}/jarjestamislupa`);
                } else {
                  console.error(
                    "Järjestämislupatietojen näyttäminen epäonnistui."
                  );
                }
              },
              cells: R.addIndex(R.map)(
                (col, ii) => {
                  return {
                    truncate: true,
                    styleClasses: [colWidths[ii]],
                    text: col.text
                  };
                },
                [{ text: jarjestajanNimi }, { text: maakunta.nimi }]
              )
            };
          }, luvat)
        }
      ]
    },
    {
      role: "tfoot"
    }
  ]

  return (
    <React.Fragment>
      <Helmet>
        <title>Kuja | Vapaa sivistystyö</title>
      </Helmet>
      <BreadcrumbsItem to="/">{intl.formatMessage(common.frontpage)}</BreadcrumbsItem>
      <BreadcrumbsItem to="/vapaa-sivistystyo">{intl.formatMessage(common.vst.titleName)}</BreadcrumbsItem>
      <div className="mx-auto w-full sm:w-3/4 mb-16">
        <h1>{intl.formatMessage(common.vst.jarjestajatHeading)}</h1>
        <React.Fragment>
          <p className="my-4">
            {intl.formatMessage(common.activeLuvatCount, {count: luvat.length})}
          </p>
          <Table structure={tableStructure} />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default VapaaSivistystyo;
