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
import auth from '@react-native-firebase/auth';
import { Eye, EyeOff } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import Transaction from '../Components/Buttons/Transactions';

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
  const [show, setShow] = useState(false);

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

  function isValidEmail(email: string) {
    // Regex to check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSignUp = async () => {
    // --- 1.Validation with User Feedback ---
    if (!username || !password || !email) {
      console.log('Missing Information', 'Please fill in all fields.');
      return;
    }
    if (!isValidEmail(email)) {
      console.log('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      console.log(
        'Weak Password',
        'Password must be at least 8 characters long.',
      );
      return;
    }

    setIsBtnPressed(true);

    // --- 2. Using try...catch for Cleaner Async Code ---
    try {
      // Create the user in Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      // --- 3. CRITICAL: Store the user's UID in Firestore ---
      if (user) {
        await firestore().collection('Users').doc(user.uid).set({
          username: username,
          email: email,
          uid: user.uid, // Storing uid for future reference
          isEmailVerified: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
          totalBalance: 0,
          income: 0,
          expenses: 0,
          transactions: [],
        });
        console.log('User account created & user data saved!');
      }
    } catch (error: any) {
      // --- 4. Unified Error Handling ---
      if (error.code === 'auth/email-already-in-use') {
        console.log('Sign Up Failed', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('Sign Up Failed', 'The email address is invalid!');
      } else {
        console.log(
          'An Error Occurred',
          'Something went wrong during sign-up.',
        );
        console.error(error);
      }
    } finally {
      // --- 5. Always Reset Button State ---
      setIsBtnPressed(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      console.log('Please enter both email and password.');
      return;
    }
    try {
      // This is the actual function call
      await auth().signInWithEmailAndPassword(email, password);
      // If successful, the onAuthStateChanged listener will handle navigation
      console.log('User signed in successfully!');
    } catch (error: any) {
      setIsBtnPressed(false);
      if (error.code === 'auth/invalid-credential') {
        console.log('Invalid Credentials.');
      } else {
        console.log('Something went wrong. Please try again later.');
        console.error(error);
      }
    } finally {
      setIsBtnPressed(false);
    }
  };

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

      <View style={{ width: '100%', alignItems: 'center' }}>
        <Input
          placeholder={
            buttonTitle === 'Sign Up' ? 'Create Password' : 'Enter Password'
          }
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!show}
        />
        {show ? (
          <Eye
            onPress={() => setShow(false)}
            size={24}
            strokeWidth={1.3}
            style={styles.eye}
          />
        ) : (
          <EyeOff
            onPress={() => setShow(true)}
            size={24}
            strokeWidth={1.3}
            style={styles.eye}
          />
        )}
      </View>

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
  eye: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#3d3831' },
  footerLink: { color: '#8a583e', fontWeight: '600' },
});
