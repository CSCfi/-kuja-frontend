import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { dummyLoginUser } from 'routes/Login/modules/user'

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
  dispatch(dummyLoginUser(values));
}

export default reduxForm({
  form: 'loginform',
  onSubmit
})(LoginForm)
