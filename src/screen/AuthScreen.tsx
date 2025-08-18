import auth, {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Btn from '../Components/Buttons/Btn';
import Input from '../Components/Buttons/Input';

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
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please fill in all fields.',
      });
      return;
    }
    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
      });
      return;
    }
    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Weak Password',
        text2: 'Password must be at least 8 characters long.',
      });
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
          createdAt: firestore.FieldValue.serverTimestamp(),
          totalBalance: 0,
          income: 0,
          expenses: 0,
          transactions: [],
        });
      }
    } catch (error: any) {
      // --- 4. Unified Error Handling ---
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed',
          text2: 'That email address is already in use!',
        });
      } else if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed',
          text2: 'The email address is invalid!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An Error Occurred',
          text2: 'Something went wrong during sign-up. Please try-again later',
        });
        console.error(error);
      }
    } finally {
      // --- 5. Always Reset Button State ---
      setIsBtnPressed(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Credential Required',
        text2: 'Please enter both email and password.',
      });
      return;
    }
    setIsBtnPressed(true);
    try {
      // This is the actual function call
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials',
          text2: 'Enter valid credentials.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again later',
        });
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
