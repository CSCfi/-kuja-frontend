const validate = values => {
    const errors = {}

    if (!values.muutosperustelu) {
        errors.muutosperustelu = 'Muutospyynnölle täytyy valita perustelu'
    } else if (values.muutosperustelu === '01') {
        if (!values.muuperustelu) {
            errors.muuperustelu = 'Kirjoita perustelu'
        }
    }

    // TODO: Finish validation
    if (values.tutkintomuutokset) {
        errors.tutkintomuutokset = []
        values.tutkintomuutokset.forEach(muutos => {
            if (isEmpty(muutos.perustelu)) {
                errors.tutkintomuutokset.push({ koodiarvo: muutos.koodiarvo, error: "Kirjoita perustelu" })
            }
        })
    }

    return errors
}

function isEmpty(string) {
    if (!string) {
        return true
    }

    if (string === null) {
        return true
    }

    if (string === "") {
        return true
    }

    return false
}

export default validate
