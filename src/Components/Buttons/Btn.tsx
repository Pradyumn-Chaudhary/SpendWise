import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type SignBtnProps = {
  title: string;
  disabled: boolean
  onPress: () => void;
};

export default function Btn({ title, onPress, disabled }: SignBtnProps) {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={onPress} style={[styles.btn, {backgroundColor: disabled ? "#b49a8b" : '#8a583e'}]} disabled={disabled}>
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
