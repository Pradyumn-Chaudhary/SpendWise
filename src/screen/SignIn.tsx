import React from 'react';
import AuthScreen from './AuthScreen';

export default function SignIn({ navigation }: any) {
  return (
    <AuthScreen
      logo={require('../assets/revenue-i2.png')}
      title="Welcome Back"
      buttonTitle="Sign In"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      onSubmit={(email, password) => console.log('Login with', email, password)}
      onFooterPress={() => navigation.navigate('SignUp')}
      ForgetPassword
      ForgetLink={() => navigation.navigate('Forget')}
    />
  );
}
