import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { insertPatient } from '../db';

export default function AddPatient({ onAdd }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  function save() {
    if (!name || !age) return;
    insertPatient(name, parseInt(age), () => {
      setName(''); setAge('');
      onAdd();
    });
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
      <Button title="Add Patient" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  input: { borderColor: '#888', borderWidth: 1, padding: 8, marginBottom: 10 }
});
