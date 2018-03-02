const validate = values => {
  console.log('validate')
  console.log(values)
  const errors = {}

  if (!values.paatoskierros) {
    errors.paatoskierros = 'Päätöskierros täytyy valita'
  }

  if (!values.muutosperustelu) {
    errors.muutosperustelu = 'Muutospyynnölle täytyy valita perustelu'
  } else if (values.muutosperustelu === '01') {
    console.log('muu perustelu')
    console.log(values)

    if (!values.muuperustelu) {
      errors.muuperustelu = 'Kirjoita perustelu'
    }
  }

  return errors
}

export default validate
