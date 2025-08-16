import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Utensils,
  ShoppingCart,
  Bus,
  Film,
  FileText,
  Wallet,
  MoreHorizontal,
} from 'lucide-react-native';

export default function NewTransaction() {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { name: 'Food & Drinks', icon: Utensils },
    { name: 'Shopping', icon: ShoppingCart },
    { name: 'Transportation', icon: Bus },
    { name: 'Entertainment', icon: Film },
    { name: 'Bills', icon: FileText },
    { name: 'Income', icon: Wallet },
    { name: 'Other', icon: MoreHorizontal },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>New Transaction</Text>
        <TouchableOpacity>
          <Text style={styles.save}>Save ✓</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          elevation: 15,
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
        }}
      >
        {/* Expense / Income Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggle, type === 'expense' && styles.activeExpense]}
            onPress={() => setType('expense')}
          >
            <ArrowDownCircle
              color={type === 'expense' ? '#fff' : '#555'}
              size={20}
            />
            <Text
              style={[
                styles.toggleText,
                type === 'expense' && { color: '#fff' },
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggle, type === 'income' && styles.activeIncome]}
            onPress={() => setType('income')}
          >
            <ArrowUpCircle
              color={type === 'income' ? '#fff' : '#555'}
              size={20}
            />
            <Text
              style={[
                styles.toggleText,
                type === 'income' && { color: '#fff' },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.currency}>₹</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Transaction Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Transaction Category"
          value={category}
          onChangeText={setCategory}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.category,
                  category === cat.name && styles.activeCategory,
                ]}
                onPress={() => setCategory(cat.name)}
              >
                <Icon
                  size={18}
                  color={category === cat.name ? '#fff' : '#555'}
                />
                <Text
                  style={[
                    styles.categoryText,
                    category === cat.name && { color: '#fff' },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fef9f3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  save: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
  },
  activeExpense: {
    backgroundColor: '#885941',
    borderColor: '#a72f3a',
  },
  activeIncome: {
    backgroundColor: '#55b28e',
    borderColor: '#55b28e',
  },
  toggleText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555',
  },
  currency: {
    fontSize: 28,
    marginBottom: 10,
  },
  amountInput: {
    width: '100%',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  activeCategory: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryText: {
    marginLeft: 6,
    color: '#555',
  },
});
