const validate = values => {
  const errors = {}

  if (!values.paatoskierros) {
    errors.paatoskierros = 'Päätöskierros täytyy valita'
  }

  if (!values.muutosperustelu) {
    errors.muutosperustelu = 'Muutospyynnölle täytyy valita perustelu'
  } else if (values.muutosperustelu === '01') {
    if (!values.muuperustelu) {
      errors.muuperustelu = 'Kirjoita perustelu'
    }
  }

  return errors
}

export default validate
