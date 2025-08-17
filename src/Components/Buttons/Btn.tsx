import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BtnProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Btn({ title, onPress, disabled = false }: BtnProps) {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btn,
          { backgroundColor: disabled ? '#b49a8b' : '#8a583e' },
        ]}
        disabled={disabled}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
  },
});
