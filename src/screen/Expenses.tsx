import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
  Timestamp,
} from '@react-native-firebase/firestore';
import { LogOut } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Transaction from '../Components/Buttons/Transactions';

type UserData = {
  username: string;
  email: string;
  uid: string;
  isEmailVerified: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  totalBalance: number;
  income: number;
  expenses: number;
  transactions: [];
};

interface TransactionType {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  createdAt: Timestamp;
}

export default function Expenses({ navigation }: any) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        // Now, we attempt the Firestore get()
        firestore()
          .collection('Users')
          .doc(user.uid)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists()) {
              const data = documentSnapshot.data();
              if (data) {
                console.log('✅ Successfully fetched Firestore document:');
                setUserData(data as UserData);
                setTransactions(data.transactions!);
              }
            } else {
              console.error(
                '❌ Firestore document does NOT exist for this UID!',
              );
            }
          })
          .catch(error => {
            console.error('❌ Firestore GET operation failed:', error);
          });
      } else {
        // User is signed out.
        console.error('❌ Auth listener CONFIRMED NO user is signed in.');
      }
    });

    return subscriber; // Unsubscribe on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.username}>{userData?.username}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewExpense')}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper} onPress={handleSignOut}>
            <LogOut color="black" size={24} strokeWidth={1.3} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Total Balance</Text>
        <Text style={styles.balance}>₹{userData?.totalBalance}</Text>

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.label}>Income</Text>
            <Text style={styles.income}>₹{userData?.income}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.label}>Expenses</Text>
            <Text style={styles.expenses}>₹{userData?.expenses}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.recentTitle}>Recent Transactions</Text>

      <FlatList
        style={{ width: '100%', padding: 0 }}
        data={[...transactions].reverse()}
        // inverted={true}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Transaction
            title={item.title}
            category={item.category}
            amount={item.amount}
            type={item.type}
            date={item.date}
          />
        )}
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
