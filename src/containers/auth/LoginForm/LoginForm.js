import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Button } from '@components/common';
import { InputField } from '@components/form';
import validationSchema from './schema';

class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  handleSubmit = values => {
    const { onSubmit } = this.props;
    console.log(values);

    onSubmit(values);
  };

  renderForm = ({ isSubmitting, isValid }) => {
    return (
      <Form>
        <Field component={InputField} name="email" type="email" label="Email" />
        <Field
          component={InputField}
          name="password"
          type="password"
          label="Password"
        />
        <Button mt={2} type="submit" loading={isSubmitting} disabled={isValid}>
          Log In
        </Button>
      </Form>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.handleSubmit}
        validationSchema={validationSchema}
        render={this.renderForm}
      />
    );
  }
}

export default LoginForm;
