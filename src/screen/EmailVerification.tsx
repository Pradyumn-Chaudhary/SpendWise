import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../Components/Buttons/Input';
import Btn from '../Components/Buttons/Btn';

export default function EmailVerification() {
  const [VerificationCode, setVerificationCode] = useState('');
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Verify your email</Text>
      <Input
        placeholder="Enter your verification code"
        value={VerificationCode}
        onChangeText={setVerificationCode}
        autoCapitalize="none"
        textCenter
      />
      <View style={{ width: '40%' }}>
        <Btn title="Verify" onPress={() => console.log('verified')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: 'bold', fontSize: 24 },
});
