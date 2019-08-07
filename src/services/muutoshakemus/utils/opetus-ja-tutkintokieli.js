import * as R from "ramda";
import { getMetadata } from "./tutkinnotUtils";

export default function getChangesOfOpetusJaTutkintokieli(opetuskieliData) {
    return R.flatten(
        R.map(stateItem => {
            const anchorParts = stateItem.anchor.split(".");
            const code = R.last(anchorParts);
            const meta = getMetadata(R.tail(anchorParts), opetuskieliData.state[0].categories);
            return {
                koodiarvo: code,
                koodisto: "oppilaitoksenopetuskieli",
                nimi: meta.kuvaus,
                kuvaus: meta.kuvaus,
                isInLupa: meta.isInLupa,
                kohde: meta.kohde.kohdeArvot[0].kohde,
                maaraystyyppi: meta.maaraystyyppi,
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