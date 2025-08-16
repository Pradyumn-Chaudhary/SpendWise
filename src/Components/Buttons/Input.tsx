import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

type InputProp = TextInputProps & {
  textCenter?: boolean; // optional
};

export default function Input({ textCenter = false, ...rest }: InputProp) {
  return (
    <TextInput
      style={[styles.input, { textAlign: textCenter ? 'center' : 'left' }]}
      placeholderTextColor="#a9a9a9"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginTop: 15,
    borderWidth: 1,
    paddingHorizontal: 15,
    width: '90%',
    borderColor: '#e0dbd5',
    borderRadius: 10,
  },
});
