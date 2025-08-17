import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Btn from '../Components/Buttons/Btn';
import Input from '../Components/Buttons/Input';
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

type AuthProps = {
  logo: any;
  title: string;
  buttonTitle: string;
  footerText: string;
  footerLinkText: string;
  name?: boolean;
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
  onFooterPress,
  ForgetPassword = false,
  ForgetLink,
}: AuthProps) {
  const navigation = useNavigation<any>();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnPressed, setIsBtnPressed] = useState(false);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // Only navigate if the user object exists (i.e., user has logged in)
    if (user) {
      navigation.navigate('Expenses');
    }
    // If the user becomes null (logs out), this effect will run,
    // but the 'if' condition will prevent a navigation call.
  }, [user, navigation]);

  if (initializing) return null;

  const handleSignUp = () => {
    setIsBtnPressed(true);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    setIsBtnPressed(false);
  };

  const handleSignIn = () => {};

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>{title}</Text>

      {name && (
        <Input
          placeholder="Enter Name"
          value={username}
          onChangeText={setName}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      )}

      <Input
        placeholder="Enter E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        placeholder={
          buttonTitle === 'Sign Up' ? 'Create Password' : 'Enter Password'
        }
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Btn
        title={buttonTitle}
        onPress={name ? handleSignUp : handleSignIn}
        disabled={isBtnPressed}
      />

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
