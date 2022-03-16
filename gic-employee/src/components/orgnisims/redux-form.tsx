import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'

const validate = (values: any) => {
    const errors = {} as any;
    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.age) {
      errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
      errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
      errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
  }

export interface IFormProps {
    username:string;
    password:string;
  }

export interface IDispatchProps {
    handleSubmit: () => any;
}

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  } : any) => {
    console.log(input.value);
    return (
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label={label}
        value = {input.value || "JARTGIJ"}
      />
      )
  }
  
const ContactFormComponent = (props : IDispatchProps & InjectedFormProps<any, IDispatchProps>) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return <form onSubmit={handleSubmit}>

        <Field
                name="username"
                type="text"
                component={renderTextField}
                label="Username"
            />
        <button type="submit" disabled={ pristine || submitting}>
          Submit
        </button>

  </form>
}

const ContactForm = reduxForm<any, IDispatchProps>({
  // a unique name for the form
  form: 'ContactForm',
  validate,
})(ContactFormComponent)

export default ContactForm