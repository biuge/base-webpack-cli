import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
  ;

let ContactForm = (props) => {
  console.log(props);
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contactFormValues',
  // getFormState: state => state.extraReducers.form,
})(ContactForm);
const selector = formValueSelector('contactFormValues'); // <-- same as form name
// ContactForm = connect(state => ({
//   firstName: selector(state, 'firstName'),
// }))(ContactForm);
export default ContactForm;
// export default connect(state => ({
//   firstName: selector(state, 'first'),
//   secondValue: selector(state, 'second'),
// }))(ContactForm);
