const validate = values => {
  const errors = {}

  console.log(values)

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
