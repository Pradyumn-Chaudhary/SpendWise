import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../Components/Buttons/Input';
import Btn from '../Components/Buttons/Btn';

export default function Forget() {
  const [Email, setEmail] = useState('');
  const [isCodeSend, setisCodeSend] = useState(false);
  const [VerificationCode, setVerificationCode] = useState('');
  const [Password, setPassword] = useState('');
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
              title="Send Verification Code"
              onPress={() => console.log('verified')}
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
          <Btn title="Sign in" onPress={() => console.log('verified')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: 'bold', fontSize: 24 },
});
