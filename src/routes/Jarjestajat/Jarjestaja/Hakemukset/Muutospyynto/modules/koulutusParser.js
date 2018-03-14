import _ from 'lodash'
import { parseLocalizedField } from "../../../../../../modules/helpers"

const keys = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10'
]

export const parseKoulutukset = (koulutusdata, koodiarvo, metadata) => {

  if (koulutusdata && koodiarvo && metadata) {
    const name = parseLocalizedField(metadata)

    let koulutusArray = []
    let kouluksetObj = {}

    kouluksetObj.koodiarvo = koodiarvo
    kouluksetObj.metadata = metadata
    kouluksetObj.nimi = name

    _.forEach(koulutusdata, (data) => {
      const { koodiArvo, metadata, versio } = data
      // TODO: selvitetään mikä on oikea versiokäytäntö
      // if (versio !== 8 && versio !== 9) {
      //   console.log(`koulutusalan koodiarvolla: ${koodiarvo} löytyi koulutus: ${koodiArvo} ${parseLocalizedField(metadata)} versiolla: ${versio}`)
      // }
      // toistaiseksi käytetään vain koulutuksia versiolla 8
      if (versio && versio === 8) {
        koulutusArray.push({
          koodiarvo: koodiArvo,
          nimi: parseLocalizedField(metadata)
        })
      }
    })

    kouluksetObj.koulutukset = koulutusArray

    return kouluksetObj

  }
}
