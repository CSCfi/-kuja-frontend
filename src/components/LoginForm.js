import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { loginUser } from '../actions'

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Valitse rooli: </label>
        <Field name="role" component="select">
          <option />
          <option value="esittelijä">Esittelijä</option>
          <option value="kj">Koulutuksen järjestäjä</option>
        </Field>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Kirjaudu</button>
      </div>
    </form>
  )
}

const onSubmit = (values, dispatch) => {
  dispatch(loginUser(values));
}


export default reduxForm({
  form: 'loginform',
  onSubmit
})(LoginForm)
