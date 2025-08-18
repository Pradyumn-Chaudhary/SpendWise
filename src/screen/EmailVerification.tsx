import auth, {
  FirebaseAuthTypes,
  sendEmailVerification,
} from '@react-native-firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Btn from '../Components/Buttons/Btn';

export default function EmailVerification({ navigation }: any) {
  const [isBtnClicked, setisBtnClicked] = useState(false);
  // const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // const appState = useRef(AppState.currentState);

  const handleVerification = () => {
    const sendVerification = async () => {
      setisBtnClicked(true);
      try {
        await sendEmailVerification(auth().currentUser!);
        Toast.show({
          type: 'success',
          text1: 'Verification Link Sent!',
          text2:
            'Also check your Spam folder. Sign in to app after verification',
        });
        navigation.navigate('SignIn');
        auth().signOut();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error sending verification email',
          text2: 'Please try again later',
        });
        console.error('Error sending verification email:', error);
      } finally {
        setTimeout(() => {
          setisBtnClicked(false);
        }, 120000);
      }
    };
    sendVerification();
  };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(latestUser => {
  //     setUser(latestUser);
  //     console.log('Authentication state changed. User:', latestUser);
  //   });

  //   return subscriber;
  // }, []);

  // It forces a user reload when the app comes to the foreground.
  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState: any) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       const currentUser = auth().currentUser;
  //       if (currentUser) {
  //         // Force Firebase to reload the user's token and data.
  //         // This will trigger onAuthStateChanged listener.
  //         currentUser.reload();
  //         console.log('✅ User data reloaded from Firebase.');
  //       }
  //     }
  //     appState.current = nextAppState;
  //   };

  //   const subscription = AppState.addEventListener(
  //     'change',
  //     handleAppStateChange,
  //   );
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('Running');
  //   const handleEmail = async () => {
  //     if (user?.emailVerified) {
  //       await auth().signOut();
  //       navigation.navigate('SignIn');
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Email Verified',
  //         text2: 'Please sign in to your account 😊',
  //       });
  //     }
  //   };
  //   handleEmail();
  // }, [user]);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Send Verification Link</Text>
      <View style={{ width: '80%' }}>
        <Btn
          title="Verify"
          onPress={handleVerification}
          disabled={isBtnClicked}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: 'bold', fontSize: 24 },
});
