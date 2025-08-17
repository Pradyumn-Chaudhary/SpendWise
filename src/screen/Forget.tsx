import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../Components/Buttons/Input';
import Btn from '../Components/Buttons/Btn';
import {
  getAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from '@react-native-firebase/auth';

export default function Forget({ navigation }: any) {
  const [Email, setEmail] = useState('');
  const [isCodeSend, setisCodeSend] = useState(false);
  const [VerificationCode, setVerificationCode] = useState('');
  const [Password, setPassword] = useState('');
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  function isValidEmail(email: string) {
    // Regex to check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleForget = async () => {
    if (!Email) {
      console.log('Missing Email', 'Please enter your email address.');
      return;
    }
    if (!isValidEmail(Email)) {
      console.log('Invalid Email Address');
      return;
    }
    setIsBtnClicked(true);
    const auth = getAuth();
    try {
      // This is the correct way to call the function
      await sendPasswordResetEmail(auth, Email);
      // setisCodeSend(true);
      navigation.navigate('SignIn');
      console.log(
        'Check Your Email',
        'If an account exists for this email, a password reset link has been sent. Also check in Spam Folder',
      );
    } catch (error) {
      // We show a generic message even for errors to prevent user enumeration
      console.log(
        'Check Your Email',
        'If an account exists for this email, a password reset link has been sent.',
      );
      console.error('Password reset error:', error);
    } finally {
      setIsBtnClicked(false);
    }
  };

  const handleVerification = async () => {
    // 1. Use Alert for user-facing validation
    if (!Password || !VerificationCode) {
      console.log(
        'Missing Information',
        'Please enter the verification code and a new password.',
      );
      return;
    }
    if (Password.length < 8) {
      console.log('Your password must be at least 8 characters long.');
      return;
    }

    setIsBtnClicked(true);
    const auth = getAuth();

    try {
      await confirmPasswordReset(auth, VerificationCode, Password);

      // 2. Provide a clear success message and navigate on completion
      console.log(
        'Success!',
        'Your password has been reset. Please sign in with your new password.',
      );
      navigation.navigate('SignIn');
    } catch (error: any) {
      // 3. Implement robust error handling
      console.error('Password Reset Error:', error);
      let errorMessage = 'An unknown error occurred. Please try again.';

      // Check for specific Firebase error codes to give better feedback
      if (error.code === 'auth/invalid-action-code') {
        errorMessage =
          'The reset code is invalid or has expired. Please request a new one.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The new password is not strong enough.';
      }

      console.log('Password Reset Failed', errorMessage);
    } finally {
      // This part is perfect! It always re-enables the button.
      setIsBtnClicked(false);
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Forget Password</Text>
      {!isCodeSend ? (
        <>
          <Input
            placeholder="Enter your email"
            value={Email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textCenter
          />
          <View style={{ width: '60%' }}>
            <Btn
              title="Send Reset Link"
              onPress={handleForget}
              disabled={isBtnClicked}
            />
          </View>
        </>
      ) : (
        <>
          <Input
            placeholder="Enter your verification code"
            value={VerificationCode}
            onChangeText={setVerificationCode}
            autoCapitalize="none"
          />
          <Input
            placeholder="Create new password"
            value={Password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <Btn
            title="Verify Code"
            onPress={handleVerification}
            disabled={isBtnClicked}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: 'bold', fontSize: 24 },
});
