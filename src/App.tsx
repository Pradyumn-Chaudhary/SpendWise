import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import EmailVerification from './screen/EmailVerification';
import Expenses from './screen/Expenses';
import Forget from './screen/Forget';
import NewExpense from './screen/NewExpense';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="NewExpense" component={NewExpense} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
