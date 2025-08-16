import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import EmailVerification from './screen/EmailVerification';
import Expenses from './screen/Expenses';
import NewExpense from './screen/NewExpense';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import Forget from './screen/Forget';

export default function App() {
  const Stack = createNativeStackNavigator();

  const StackNavigator = (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Email-Verification" component={EmailVerification} />
      <Stack.Screen name="Forget" component={Forget} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="NewExpense" component={NewExpense} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Email-Verification" component={EmailVerification} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="NewExpense" component={NewExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
