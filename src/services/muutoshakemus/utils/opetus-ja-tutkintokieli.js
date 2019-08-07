import * as R from "ramda";
import { getMetadata } from "./tutkinnotUtils";

export default function getChangesOfOpetusJaTutkintokieli(opetuskieliData, muutoshakemus) {
    return R.flatten(
        R.map(stateItem => {
            const anchorParts = stateItem.anchor.split(".");
            const code = R.last(anchorParts);
            const meta = getMetadata(R.tail(anchorParts), muutoshakemus.opetuskielet.state[0].categories);
            return {
                koodiarvo: code,
                koodisto: "oppilaitoksenopetuskieli",
                nimi: meta.kuvaus,
                kuvaus: meta.kuvaus,
                isInLupa: meta.isInLupa,
                kohde: meta.kohde.kohdeArvot[0].kohde,
                // maaraystyyppi: meta.maaraystyyppi,
                maaraystyyppi: {
                    tunniste: "VELVOITE",
                    selite: {
                        fi: "Velvoite"
                    },
                    uuid: "d64967d6-17e0-11e9-98d4-02420a141704"
                },
                type: stateItem.properties.isChecked ? "addition" : "removal",
                meta: {
                    nimi: meta.kuvaus,
                    koulutusala: anchorParts[0],
                    koulutustyyppi: anchorParts[1],
                    perusteluteksti: null,
                    muutosperustelukoodiarvo: []
                },
                tila: stateItem.properties.isChecked ? "LISAYS" : "POISTO"
            };
        }, opetuskieliData.state.changes)
    );
}