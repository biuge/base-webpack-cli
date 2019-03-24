import React from 'react';
import { form } from 'antd';
import ContactForm from './ContactForm';
import { connect } from 'dva';

@connect(({ contactForm }) => ({
  contactForm,
}))
export default class ContactPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    console.log(values);
  }
  render() {
    console.log(this.props);
    return (
      <ContactForm onSubmit={this.submit} />
    );
  }
}
