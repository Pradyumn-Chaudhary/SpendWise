import React from 'react';
import AuthScreen from './AuthScreen';

export default function SignUp({ navigation }: any) {
  return (
    <AuthScreen
      logo={require('../assets/revenue-i1.png')}
      title="Create Account"
      buttonTitle="Sign Up"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      name
      onFooterPress={() => navigation.navigate('SignIn')}
    />
  );
}
