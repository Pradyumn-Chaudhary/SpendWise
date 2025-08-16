import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Btn from '../Components/Buttons/Btn';
import Input from '../Components/Buttons/Input';

type AuthProps = {
  logo: any;
  title: string;
  buttonTitle: string;
  footerText: string;
  footerLinkText: string;
  name?: boolean;
  onSubmit: (email: string, password: string) => void;
  onFooterPress: () => void;
  ForgetPassword?: boolean;
  ForgetLink?: () => void;
};

export default function AuthScreen({
  logo,
  title,
  buttonTitle,
  footerText,
  footerLinkText,
  name = false,
  onSubmit,
  onFooterPress,
  ForgetPassword = false,
  ForgetLink,
}: AuthProps) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>{title}</Text>

      {name && (
        <Input
          placeholder="Enter Name"
          value={Name}
          onChangeText={setName}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}

      <Input
        placeholder="Enter E-mail"
        value={Email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        placeholder={
          buttonTitle === 'Sign Up' ? 'Create Password' : 'Enter Password'
        }
        value={Password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Btn title={buttonTitle} onPress={() => onSubmit(Email, Password)} />

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{footerText} </Text>
        <TouchableOpacity onPress={onFooterPress}>
          <Text style={styles.footerLink}>{footerLinkText}</Text>
        </TouchableOpacity>
      </View>
      {ForgetPassword && (
        <TouchableOpacity onPress={ForgetLink}>
          <Text style={[styles.footerLink, { margin: 7 }]}>
            Forget Password
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: '100%', aspectRatio: 1, maxHeight: 350 },
  title: {
    color: '#90827b',
    fontFamily: 'Georgia',
    marginTop: 30,
    fontSize: 28,
    fontWeight: 'bold',
  },
  footerRow: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#3d3831' },
  footerLink: { color: '#8a583e', fontWeight: '600' },
});
