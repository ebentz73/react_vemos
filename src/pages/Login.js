import React from 'react';
import LoginForm from '@containers/auth/LoginForm';
import CardPage from '@containers/layout/CardPage';

export default function LoginPage() {
  return (
    <CardPage title="Log In">
      <LoginForm onSubmit={() => {}} />
    </CardPage>
  );
}
