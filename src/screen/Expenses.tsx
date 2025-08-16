import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { LogOut, Ghost } from 'lucide-react-native';
import Transaction from '../Components/Buttons/Transactions';

export default function Expenses({ navigation }: any) {
  const [username, setUsername] = useState('Anu Kuntal');
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewExpense')}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => console.log('Logout pressed')}
          >
            <LogOut color="black" size={24} strokeWidth={1.3} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Total Balance</Text>
        <Text style={styles.balance}>₹5216.00</Text>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.label}>Income</Text>
            <Text style={styles.income}>₹5500.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.label}>Expenses</Text>
            <Text style={styles.expenses}>₹284.00</Text>
          </View>
        </View>
      </View>

      <Text style={styles.recentTitle}>Recent Transactions</Text>

      <Transaction
        title="Salary"
        category="cinema"
        amount={300}
        type="income"
        Icon={Ghost}
      />
      <Transaction
        title="Salary"
        category="cinema"
        amount={300}
        type="expense"
        Icon={Ghost}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f3',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
  },
  logo: {
    height: 100,
    width: 100,
  },
  userInfo: {
    marginLeft: 8,
  },
  welcomeText: {
    color: '#9f9895',
  },
  username: {
    color: '#000',
  },
  addButton: {
    backgroundColor: '#885a42',
    justifyContent: 'center',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconWrapper: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    height: '100%',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  income: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#55b28e',
  },
  expenses: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a72f3a',
  },
  recentTitle: {
    alignSelf: 'flex-start',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
