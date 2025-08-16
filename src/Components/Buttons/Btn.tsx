import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type SignBtnProps = {
  title: string;
  onPress: () => void;
};

export default function Btn({ title, onPress }: SignBtnProps) {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={onPress} style={styles.btn}>
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
    backgroundColor: '#8a583e',
    margin: 15,
    borderRadius: 10,
  },
});
