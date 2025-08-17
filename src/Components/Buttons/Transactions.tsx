import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native'; // example icons
import { getIcon } from '../../utils/IconMap';

type TransactionProps = {
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
};

export default function Transaction({
  title,
  category,
  amount,
  type,
  date,
}: TransactionProps) {
  const Icon = getIcon(category);
  return (
    <View style={styles.card}>
      {/* Left Icon */}
      <View style={styles.iconContainer}>
        <Icon
          color={type === 'income' ? '#55b28e' : '#a72f3a'}
          size={24}
          strokeWidth={2.5}
        />
      </View>

      {/* Middle Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      {/* Right Info */}
      <View style={styles.rightSection}>
        <Text
          style={[
            styles.amount,
            type === 'income' ? styles.income : styles.expense,
          ]}
        >
          {type === 'income'
            ? `₹${amount.toFixed(2)}`
            : `₹${amount.toFixed(2)}`}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Delete Icon */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => console.log('Deleted')}
      >
        <Trash2 color="#D6171D" size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f5f7f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  category: {
    fontSize: 13,
    color: '#888',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#55b28e',
  },
  expense: {
    color: '#a72f3a',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  deleteBtn: {
    padding: 4,
  },
});
